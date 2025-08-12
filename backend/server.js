import express from "express";
import connectToDatabase from './database/mongodb.js';
import {PORT} from './config/env.js';
import authRouter from "./routes/auth.route.js";
import videoRouter from "./routes/video.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/user', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Video Summerizer API!');
  });
  
  app.listen(PORT, async () => {
    console.log(` API is running on http://localhost:${PORT}`);
  
    await connectToDatabase();
    
  });
  
  export default app;