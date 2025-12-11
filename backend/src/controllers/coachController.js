import Coach from '../models/Coach.js';

export const listCoaches = async (req, res) => res.json(await Coach.find({ active: true }));

export const createCoach = async (req, res) => res.status(201).json(await Coach.create(req.body));

export const setAvailability = async (req, res) => {
  const { start, end } = req.body;
  const c = await Coach.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Coach not found' });
  c.unavailable.push({ start: new Date(start), end: new Date(end) });
  await c.save();
  res.json(c);
};
