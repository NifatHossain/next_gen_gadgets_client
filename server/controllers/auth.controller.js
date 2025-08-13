const User = require("../models/auth.model")
const ErrorResponse = require("../utils/ErrorResponse")
const SuccessResponse = require("../utils/SuccessResponse")
const { compareHashPassword, generatePassowrdHash, generateToken } = require("../lib/crypto")

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    console.log("Registering user:", { name, email });
    
    // Validate input
    if (!name || !email || !password) {
      throw new ErrorResponse("All fields are required", 400)
    }

    if (password.length < 6) {
      throw new ErrorResponse("Password must be at least 6 characters long", 400)
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new ErrorResponse("User already exists", 400)
    }

    // Hash password
    const hashedPassword = await generatePassowrdHash(password)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: true, // Auto-verify users
      provider: "local",
    })

    await user.save()

    // Generate JWT token
    const token = generateToken(user._id)

    const response = new SuccessResponse("User registered successfully. You can now login.", 201, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    })

    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ErrorResponse("Email and password are required", 400)
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      throw new ErrorResponse("Invalid credentials", 401)
    }

    // Check password
    const isPasswordValid = await compareHashPassword(password, user.password)
    if (!isPasswordValid) {
      throw new ErrorResponse("Invalid credentials", 401)
    }

    // Generate JWT token
    const token = generateToken(user._id)

    const response = new SuccessResponse("Login successful", 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })

    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    OAuth Login
 * @route   POST /api/v1/auth/oauth-login
 * @access  Public
 */
const oauthLogin = async (req, res, next) => {
  try {
    const { name, email, provider } = req.body

    // Check if the user already exists in the database
    let user = await User.findOne({ email })

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
        name,
        email,
        isVerified: true, // Automatically verify for OAuth users
        provider: provider || "google",
      })

      await user.save()
    }

    // Generate JWT token
    const token = generateToken(user._id)

    const response = new SuccessResponse("User logged in via OAuth", 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })

    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/profile
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password")

    if (!user) {
      throw new ErrorResponse("User not found", 404)
    }

    const response = new SuccessResponse("Profile retrieved successfully", 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })

    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body

    if (!name) {
      throw new ErrorResponse("Name is required", 400)
    }

    const user = await User.findById(req.user._id)

    if (!user) {
      throw new ErrorResponse("User not found", 404)
    }

    user.name = name
    await user.save()

    const response = new SuccessResponse("Profile updated successfully", 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Change password
 * @route   PUT /api/v1/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
      throw new ErrorResponse("Old password and new password are required", 400)
    }

    if (newPassword.length < 6) {
      throw new ErrorResponse("New password must be at least 6 characters long", 400)
    }

    const user = await User.findById(req.user._id)

    if (!user) {
      throw new ErrorResponse("User not found", 404)
    }

    // Verify current password
    const isCurrentPasswordValid = await compareHashPassword(oldPassword, user.password)
    if (!isCurrentPasswordValid) {
      throw new ErrorResponse("Current password is incorrect", 400)
    }

    // Hash new password
    const hashedNewPassword = await generatePassowrdHash(newPassword)

    // Update password
    user.password = hashedNewPassword
    await user.save()

    const response = new SuccessResponse("Password changed successfully", 200)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      throw new ErrorResponse("Email is required", 400)
    }

    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal if user exists or not for security
      const response = new SuccessResponse(
        "If an account with that email exists, we have sent a password reset link.",
        200,
      )
      return res.status(response.statusCode).json(response)
    }

    // Generate reset token
    const resetToken = require("crypto").randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    // TODO: Send password reset email
    // await sendPasswordResetEmail(email, resetToken);

    const response = new SuccessResponse(
      "If an account with that email exists, we have sent a password reset link.",
      200,
    )
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Reset password
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      throw new ErrorResponse("Token and password are required", 400)
    }

    if (password.length < 6) {
      throw new ErrorResponse("Password must be at least 6 characters long", 400)
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      throw new ErrorResponse("Invalid or expired reset token", 400)
    }

    // Hash new password
    const hashedPassword = await generatePassowrdHash(password)

    // Update user password and clear reset token
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    const response = new SuccessResponse("Password reset successfully", 200)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get user by ID
 * @route   GET /api/v1/auth/user/:id
 * @access  Private
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findById(id).select("-password")

    if (!user) {
      throw new ErrorResponse("User not found", 404)
    }

    const response = new SuccessResponse("User retrieved successfully", 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })

    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

// Export all functions using CommonJS
module.exports = {
  register,
  login,
  oauthLogin,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  getUserById,
}