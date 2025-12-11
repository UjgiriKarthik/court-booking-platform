import Equipment from '../models/Equipment.js';
export const listEquipment = async (req, res) => res.json(await Equipment.find({ active: true }));
export const createEquipment = async (req, res) => res.status(201).json(await Equipment.create(req.body));
export const updateEquipment = async (req, res) => res.json(await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true }));
