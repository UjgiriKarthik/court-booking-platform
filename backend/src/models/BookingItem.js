import mongoose from 'mongoose';

const BookingItemSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  quantity: { type: Number, min: 1 },
  lineTotal: Number
}, { timestamps: true });

BookingItemSchema.index({ booking: 1, equipment: 1 });

export default mongoose.model('BookingItem', BookingItemSchema);
