import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  totalStock: { type: Number, required: true },
  unitFee: { type: Number, default: 80 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Equipment', EquipmentSchema);
