//backend/seed/seed.js
import dotenv from 'dotenv'; 
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Court from '../src/models/Court.js';
import Coach from '../src/models/Coach.js';
import Equipment from '../src/models/Equipment.js';
import PricingRule from '../src/models/PricingRule.js';
import User from '../src/models/User.js';

await mongoose.connect(process.env.MONGO_URI, { dbName: 'court_booking' });
console.log('Seeding...');

await Promise.all([
  Court.deleteMany({}),
  Coach.deleteMany({}),
  Equipment.deleteMany({}),
  PricingRule.deleteMany({}),
  User.deleteMany({})
]);

await Court.insertMany([
  { name: 'Indoor-1', type: 'indoor', indoor: true, basePricePerHour: 400 },
  { name: 'Indoor-2', type: 'indoor', indoor: true, basePricePerHour: 400 },
  { name: 'Outdoor-1', type: 'outdoor', indoor: false, basePricePerHour: 250 },
  { name: 'Outdoor-2', type: 'outdoor', indoor: false, basePricePerHour: 250 }
]);

await Equipment.insertMany([
  { name: 'Racket', totalStock: 12, unitFee: 80 },
  { name: 'Shoes', totalStock: 20, unitFee: 50 }
]);

await Coach.insertMany([
  { name: 'John', hourlyRate: 600 },
  { name: 'Priya', hourlyRate: 700 },
  { name: 'Arun', hourlyRate: 650 }
]);

await PricingRule.insertMany([
  { name: 'Peak Hour', kind: 'peak', multiplier: 1.5, priority: 10, conditions: { startHour: 18, endHour: 21 } },
  { name: 'Weekend', kind: 'weekend', surcharge: 100, priority: 20, conditions: { daysOfWeek: [0, 6] } },
  { name: 'Indoor Premium', kind: 'courtType', percent: 10, priority: 30, conditions: { indoorOnly: true } }
]);

const adminPass = await bcrypt.hash('admin123', 10);
await User.create({ name: 'Admin', email: 'admin@example.com', passwordHash: adminPass, role: 'admin' });

console.log('Seeded ✔');
process.exit(0);
