const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const envConfig = require("../config/env.config")

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, envConfig.AUTH_SECRET, { expiresIn: "7 days" })
}

// Generate password hash
const generatePassowrdHash = async (password) => {
  console.log("Password: ", password)

  const salt = await bcrypt.genSalt(Number(envConfig.SALT_ROUND))
  return await bcrypt.hash(password, salt)
}

// Compare hash password
const compareHashPassword = async (enteredPassword, hash) => {
  return await bcrypt.compare(enteredPassword, hash)
}

// generate random otp
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString()
}

// Generate a random 32-byte token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex")
}

module.exports = {
  generateToken,
  generatePassowrdHash,
  compareHashPassword,
  generateOtp,
  generateResetToken,
}