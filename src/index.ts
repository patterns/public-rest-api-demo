import { Request, Response, NextFunction } from 'express';
const express = require('express');
const dotenv = require('dotenv');

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression'
import cors from 'cors';
import helmet from 'helmet';

import authRouter from './routes/auth.routes';
import courseRouter from './routes/course.routes';
import enrollmentRouter from './routes/enrollment.routes';
import userRouter from './routes/users.routes';
import { connectDB } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

app.get('/', (req: Request, res: Response) => {
  res.send('Davinci API Backend Works');
});

// Connect to database
connectDB();

// app routers
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRouter);
app.use('/api/enrollment', enrollmentRouter);

/* 
 * app.get('*', (req: Request, res: Response) => {
 *   return handle(req, res);
 * })
 */

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({"error": err.name + ": " + err.message})
  } else if (err) {
    res.status(400).json({"error": err.name + ": " + err.message})
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

export default app;