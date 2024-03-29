import { Request, Response, NextFunction } from 'express';
const express = require('express');
const dotenv = require('dotenv');

// import express middleware
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression'
import helmet from 'helmet';

// API routes
import userRouter from './routes/users.routes';
import courseRouter from './routes/course.routes';
import enrollmentRouter from './routes/enrollment.routes';
//import forumRouter from './routes/forum.routes';
import { Account } from './models/auth-models';
import User from './models/User';

// import database connection configuration
import { connectDB } from './config/database';
import AuthService from './middleware/auth.middleware';
const authInstance = new AuthService(Account, User);


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Initialize middleware
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// Allow CORS
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Connect to database
connectDB();

// Authentication middleware in front of API routes. Checks each time an API call is made.
app.use(authInstance.getAuthToken)

// API routers
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/enrollment', enrollmentRouter);
//app.use('/api/forum', forumRouter);
//app.use('/api/wiki', wikiRouter);


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

