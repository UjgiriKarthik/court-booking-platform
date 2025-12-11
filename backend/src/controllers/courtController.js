import Court from '../models/Court.js';
export const listCourts = async (req, res) => res.json(await Court.find({ active: true }));
export const createCourt = async (req, res) => res.status(201).json(await Court.create(req.body));
export const updateCourt = async (req, res) => res.json(await Court.findByIdAndUpdate(req.params.id, req.body, { new: true }));
