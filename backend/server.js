import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import morgan from 'morgan';
import './src/config/db.js';
import routes from './src/routes/index.js';
import mongoose from 'mongoose';


const app = express();

app.use(cors({ 
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true 
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('API OK'));
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port', port));
