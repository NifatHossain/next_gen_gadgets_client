const jwt = require("jsonwebtoken")
const User = require("../models/auth.model")
const envConfig = require("../config/env.config")

const authMiddleware = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]

      // Verify token
      const decoded = jwt.verify(token, envConfig.AUTH_SECRET)

      // Find the user by ID from the token
      req.user = await User.findById(decoded.id).select("-password")

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        })
      }

      next()
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    })
  }
}

module.exports = { authMiddleware }
