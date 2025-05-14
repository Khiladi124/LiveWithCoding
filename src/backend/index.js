import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './database/index.js';
import {app} from './app.js';



dotenv.config({path: './.env'});
const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
startServer();

