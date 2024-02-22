// models/otpModel.js
import mongoose from "mongoose";
import { sendMail } from "../utils/sendMail.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30m",
  },
});

export const otpModel = mongoose.model("OTP", otpSchema);
