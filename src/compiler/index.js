import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import app from './app.js';



dotenv.config();
const PORT = 3000;
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
startServer();

