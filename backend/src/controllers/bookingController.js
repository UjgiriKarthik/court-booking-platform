// backend/src/controllers/bookingController.js
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import BookingItem from "../models/BookingItem.js";
import { calculateTotalPrice } from "../services/pricingService.js";

export const createBooking = async (req, res) => {
  try {
    const { courtId, coachId, startTime, endTime, equipment = [], idempotencyKey } = req.body;

    // ✅ FIXED — correct JWT field
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const s = new Date(startTime);
    const e = new Date(endTime);

    if (!(s < e)) {
      return res.status(400).json({ error: "Invalid time range" });
    }

    // Idempotency check
    if (idempotencyKey) {
      const existing = await Booking.findOne({ idempotencyKey });
      if (existing) return res.json(existing);
    }

    // Time-overlap check
    const overlap = await Booking.findOne({
      court: courtId,
      startTime: { $lt: e },
      endTime: { $gt: s }
    });

    if (overlap) {
      return res.status(409).json({
        error: "This time slot is already booked! Please choose another time."
      });
    }

    const pricing = await calculateTotalPrice({
      courtId,
      coachId,
      start: s,
      end: e,
      equipment
    });

    // Transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    const booking = await Booking.create([{
      user: userId,
      court: courtId,
      coach: coachId || null,
      startTime: s,
      endTime: e,
      pricingBreakdown: pricing,
      total: pricing.total,
      idempotencyKey
    }], { session });

    for (const eq of equipment) {
      await BookingItem.create([{
        booking: booking[0]._id,
        equipment: eq.equipmentId,
        quantity: eq.quantity,
        lineTotal: eq.quantity * (eq.unitFee || 0)
      }], { session });
    }

    await session.commitTransaction();
    session.endSession();

    const populated = await Booking.findById(booking[0]._id).populate("court coach");
    return res.status(201).json(populated);

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};


export const listHistory = async (req, res) => {
  // 🟢 FIX
  const userId = req.user?.id;

  const items = await Booking.find({ user: userId })
    .sort({ startTime: -1 })
    .populate("court coach");

  res.json(items);
};

export const cancelBooking = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "cancelled" },
    { new: true }
  );
  res.json(updated);
};
