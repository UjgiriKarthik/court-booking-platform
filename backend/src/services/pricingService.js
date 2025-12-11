import Court from '../models/Court.js';
import Coach from '../models/Coach.js';
import Equipment from '../models/Equipment.js';
import PricingRule from '../models/PricingRule.js';
import { hoursBetween } from '../utils/time.js';

export async function calculateTotalPrice({ courtId, coachId, start, end, equipment = [] }) {
  const court = await Court.findById(courtId);
  const rules = await PricingRule.find({ active: true }).sort({ priority: 1 });

  const hours = hoursBetween(start, end);
  const base = (court.basePricePerHour || 0) * hours;

  let price = base;
  const adjustments = [];

  const D = new Date(start);
  const dow = D.getDay();
  const hr = D.getHours();

  for (const r of rules) {
    const c = r.conditions || {};
    const okDow = !c.daysOfWeek?.length || c.daysOfWeek.includes(dow);
    const okHour = (c.startHour == null || hr >= c.startHour) && (c.endHour == null || hr < c.endHour);
    const okIndoor = (c.indoorOnly ? court.indoor : true);
    const okHoliday = !c.dateISO?.length || c.dateISO.includes(start.toISOString().slice(0, 10));
    if (!(okDow && okHour && okIndoor && okHoliday)) continue;

    if (r.multiplier) { const before = price; price *= r.multiplier; adjustments.push({ name: r.name, effect: price - before }); }
    if (r.surcharge)  { price += r.surcharge; adjustments.push({ name: r.name, effect: r.surcharge }); }
    if (r.percent)    { const add = price * (r.percent / 100); price += add; adjustments.push({ name: r.name, effect: add }); }
  }

  let coachFee = 0;
  if (coachId) {
    const coach = await Coach.findById(coachId);
    coachFee = (coach?.hourlyRate || 0) * hours;
    price += coachFee;
    adjustments.push({ name: 'Coach', effect: coachFee });
  }

  let equipmentFee = 0;
  for (const line of equipment) {
    const eq = await Equipment.findById(line.equipmentId);
    const lineTotal = (eq?.unitFee || 0) * (line.quantity || 0) * hours;
    equipmentFee += lineTotal;
    price += lineTotal;
  }
  if (equipmentFee) adjustments.push({ name: 'Equipment', effect: equipmentFee });

  return { base, coachFee, equipmentFee, ruleAdjustments: adjustments, total: Math.round(price) };
}
