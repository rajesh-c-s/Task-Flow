import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import otpGenerator from "otp-generator";
import { otpModel } from "../models/otpModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { confirmationPage,errorPage,expiredPage} from "../utils/responseContent.js";

const BASE_URL=process.env.BASE_URL||"http://localhost:3000";  
/*----------------------createToken----------------------*/
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "120m" });
};

/*----------------------send otp verification----------------------*/
const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await sendMail(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
        <p>Here is your OTP code: ${otp}</p>`
    );
    await otpModel.create({ email, otp });
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
};
/*-----------------------send verification link----------------------*/
const sendVerificationLink = async (email, verificationToken) => {
  try {
    const verificationLink = `${BASE_URL}/auth/verify-email?token=${verificationToken}`;

    const mailResponse = await sendMail(
      email,
      "Verify Your Email",
      `<h1>Please click on the link below to verify your email:</h1><p><a href="${verificationLink}">${verificationLink}</a></p>`
    );

    console.log("Email sent successfully: ", mailResponse);
    return true;
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    return false;
  }
};

/*----------------------verify otp--------------------------------*/
const verifyOTP = async (email, enteredOTP) => {
  try {
    const storedOTP = await otpModel.findOne({ email });
    if (!storedOTP) {
      return false; // OTP not found for the user
    }
    const isOTPValid = storedOTP.otp === enteredOTP?true:false;
    return isOTPValid;
  } catch (error) {
    console.log("Error while verifying OTP: ", error);
    return false;
  }
};

/*----------------------loginUser----------------------*/
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    const username=user.username;
    res.status(200).json({username,email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*----------------------registerUser----------------------*/
export const registerUser = async (req, res) => {
  const { username,email, password } = req.body;

  try {
    await userModel.register( username,email, password );
    // Store the verification token in the database
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await userModel.storeVerificationToken(email, verificationToken);
    
    // Send verification email with the link
    const isEmailSent = await sendVerificationLink(email, verificationToken);

    if (!isEmailSent) {
      res
        .status(400)
        .json({ message: "Error while sending verification email" });
      return;
    }

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

/*-----------------------verifyEmail----------------------*/
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log(token);
  try {
    const storedToken = await userModel.findOne({ verificationToken: token });
    if (!storedToken) {
      res.setHeader("Content-Type", "text/html");
      return res
        .status(400)
        .send(expiredPage);
    }
    // Mark the user's email as verified in the database
    await userModel.markEmailAsVerified(storedToken.email);
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(confirmationPage);
  } catch (error) {
    res.setHeader("Content-Type", "text/html");
    res.status(500).send(errorPage);
  }
};

/*----------------------forgotPassword-----------------------------*/
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("Email not registered");
    }
    //otp would be sent to the registered email. after otp verification, user can reset password
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    if (!sendVerificationEmail(email, otp)) {
      res.status(400).json({ message: "Error while sending OTP" });
    }
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

/*----------------------resetPassword----------------------*/
export const resetPassword = async (req, res) => {
  const { email, enteredOTP, newPassword } = req.body;

  try {
    // Verify OTP
    const isOTPValid = await verifyOTP(email, enteredOTP);
    if (!isOTPValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    // Reset the password (Implement this function in userModel)
    await userModel.resetPassword(email, newPassword);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};
