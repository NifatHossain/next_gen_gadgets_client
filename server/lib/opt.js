const envConfig = require('../config/env.config');
const Auth = require('../models/auth.model');
const { generateOtp } = require('./crypto');
const { sendEmail } = require('./sendEmail');

// Generate and send OTP
const sendOtp = async (email) => {
  const user = await Auth.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate a random 6-digit OTP
  const otp = generateOtp();

  // Set OTP and expiration time
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + Number(envConfig.OTP_VALIDITY) * 60 * 1000);

  // Save user with OTP
  await user.save();

  await sendEmail([email], "OTP Code", `<strong>${otp}</strong>`);
};

// Verify OTP
const verifyOtp = async (email, enteredOtp) => {
  const user = await Auth.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if OTP has expired
  if (!user.otpExpires || user.otpExpires < new Date()) {
    throw new Error('OTP expired');
  }

  // Verify OTP
  if (user.otp !== enteredOtp) {
    throw new Error('Invalid OTP');
  }

  // OTP is valid; update user's isActive status
  user.isActive = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return user;
};

module.exports = {
  sendOtp,
  verifyOtp,
};
