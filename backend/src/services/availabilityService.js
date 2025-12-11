import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import BookingItem from '../models/BookingItem.js';
import Equipment from '../models/Equipment.js';

export async function courtAvailable(session, courtId, s, e) {
  const conflict = await Booking.findOne({
    court: courtId, status: 'confirmed',
    $or: [
      { startTime: { $lt: e, $gte: s } },
      { endTime: { $gt: s, $lte: e } },
      { startTime: { $lte: s }, endTime: { $gte: e } }
    ]
  }).session(session);
  return !conflict;
}

export async function coachAvailable(session, coachId, s, e) {
  if (!coachId) return true;
  const conflict = await Booking.findOne({
    coach: coachId, status: 'confirmed',
    $or: [
      { startTime: { $lt: e, $gte: s } },
      { endTime: { $gt: s, $lte: e } },
      { startTime: { $lte: s }, endTime: { $gte: e } }
    ]
  }).session(session);
  return !conflict;
}

export async function equipmentAvailable(session, equipment, s, e) {
  for (const line of (equipment || [])) {
    const used = await BookingItem.aggregate([
      { $lookup: { from: 'bookings', localField: 'booking', foreignField: '_id', as: 'b' } },
      { $unwind: '$b' },
      { $match: { 'b.status': 'confirmed', 'b.startTime': { $lt: e }, 'b.endTime': { $gt: s }, equipment: new mongoose.Types.ObjectId(line.equipmentId) } },
      { $group: { _id: '$equipment', qty: { $sum: '$quantity' } } }
    ]).session(session);

    const eq = await Equipment.findById(line.equipmentId).session(session);
    const already = used[0]?.qty || 0;
    if (already + (line.quantity || 0) > (eq?.totalStock || 0)) return { ok: false, name: eq?.name || 'Equipment' };
  }
  return { ok: true };
}

export async function allAvailable(session, { courtId, coachId, s, e, equipment }) {
  if (!await courtAvailable(session, courtId, s, e)) return { ok: false, reason: 'Court unavailable' };
  if (!await coachAvailable(session, coachId, s, e)) return { ok: false, reason: 'Coach unavailable' };
  const eq = await equipmentAvailable(session, equipment, s, e);
  if (!eq.ok) return { ok: false, reason: `${eq.name} insufficient` };
  return { ok: true };
}
