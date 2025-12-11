import mongoose from 'mongoose';

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hourlyRate: { type: Number, default: 600 },
  active: { type: Boolean, default: true },
  unavailable: [{ start: Date, end: Date }]
}, { timestamps: true });

export default mongoose.model('Coach', CoachSchema);
