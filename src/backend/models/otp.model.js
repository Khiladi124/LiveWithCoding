// models/OtpToken.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // auto-expire in 5 mins
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;
