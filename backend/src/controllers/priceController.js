import { calculateTotalPrice } from '../services/pricingService.js';
export const quote = async (req, res) => {
  const { courtId, coachId, startTime, endTime, equipment = [] } = req.body;
  const pricing = await calculateTotalPrice({ courtId, coachId, start: new Date(startTime), end: new Date(endTime), equipment });
  res.json(pricing);
};
