import mongoose from 'mongoose';

const CourtSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  type: { type: String, enum: ['indoor', 'outdoor'], required: true },
  basePricePerHour: { type: Number, default: 400 },
  indoor: { type: Boolean, default: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Court', CourtSchema);
