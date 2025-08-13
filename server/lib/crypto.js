const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const envConfig = require("../config/env.config");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, envConfig.AUTH_SECRET, { expiresIn: "7 days" });
};

// Generate password hash
const generatePasswordHash = async (password) => {
  console.log("Hashing password:", password);
  const salt = await bcrypt.genSalt(Number(envConfig.SALT_ROUND));
  const hash = await bcrypt.hash(password, salt);
  console.log("Generated hash:", hash);
  return hash;
};

// Compare hash password
const compareHashPassword = async (enteredPassword, hash) => {
  console.log("Comparing password:", { enteredPassword, storedHash: hash });
  const isMatch = await bcrypt.compare(enteredPassword, hash);
  console.log("Password match result:", isMatch);
  return isMatch;
};

// Generate random OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Generate a random 32-byte token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = {
  generateToken,
  generatePasswordHash,
  compareHashPassword,
  generateOtp,
  generateResetToken,
};