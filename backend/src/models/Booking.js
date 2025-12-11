import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
  startTime: { type: Date, required: true, index: true },
  endTime: { type: Date, required: true, index: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'waitlist'], default: 'confirmed' },
  pricingBreakdown: {
    base: Number,
    coachFee: Number,
    equipmentFee: Number,
    ruleAdjustments: [{ name: String, effect: Number }],
    total: Number
  },
  idempotencyKey: { type: String, index: true }
}, { timestamps: true });

BookingSchema.index({ court: 1, startTime: 1, endTime: 1 });

export default mongoose.model('Booking', BookingSchema);
