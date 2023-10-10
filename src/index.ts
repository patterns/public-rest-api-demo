import { Request, Response } from 'express';
const express = require('express');
const dotenv = require('dotenv');

import { connectDB } from './config/database';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('DaVinci API Backend Works');
});

// Connect to database
connectDB();

// Routing for API routes
app.use('/api', router);

// Routing for Next.js pages
// app.get('*', (req: Request, res: Response) => {
//   return handle(req, res);
// });

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
