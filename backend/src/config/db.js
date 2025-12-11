import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI, { dbName: 'court_booking' })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((e) => {
    console.error('MongoDB connection error', e);
    process.exit(1);
  });
