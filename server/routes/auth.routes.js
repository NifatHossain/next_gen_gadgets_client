const { Router } = require("express");
const {
  register,
  login,
  oauthLogin,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  getUserById,
} = require("../controllers/auth.controller.js");
const { authMiddleware } = require("../middleware/auth.middleware.js");
const validateMiddleware = require("../middleware/validation.middleware.js");
const { registerSchema, loginSchema } = require("../schemas/authValidation.schema.js");

const router = Router();

/**
 * @route POST /auth/register
 * @group Auth - Operations about Auth
 * @param {string} name.body.required - User's name
 * @param {string} email.body.required - User's email
 * @param {string} password.body.required - User's password
 * @returns {object} 201 - success response
 * @returns {Error} 400 - User already exists
 */
router.post("/auth/register", validateMiddleware(registerSchema), register);

/**
 * @route POST /auth/login
 * @group Auth - Operations about Auth
 * @param {string} email.body.required - User's email
 * @param {string} password.body.required - User's password
 * @returns {object} 200 - success response
 * @returns {Error} 401 - Invalid credentials
 */
router.post("/auth/login", validateMiddleware(loginSchema), login);

/**
 * @route POST /auth/oauth-login
 * @group Auth - Operations about Auth
 * @param {string} provider.body.required - OAuth provider (google)
 * @param {string} name.body.required - Name from OAuth
 * @param {string} email.body.required - Email from OAuth
 * @returns {object} 200 - success response
 */
router.post("/auth/oauth-login", oauthLogin);

/**
 * @route GET /auth/profile
 * @group Auth - Operations about Auth
 * @security JWT
 * @returns {object} 200 - success response
 * @returns {Error} 401 - Unauthorized
 */
router.get("/auth/profile", authMiddleware, getProfile);

/**
 * @route PUT /auth/profile
 * @group Auth - Operations about Auth
 * @security JWT
 * @param {string} name.body.optional - New name
 * @returns {object} 200 - success response
 * @returns {Error} 401 - Unauthorized
 */
router.put("/auth/profile", authMiddleware, updateProfile);

/**
 * @route PUT /auth/change-password
 * @group Auth - Operations about Auth
 * @security JWT
 * @param {string} oldPassword.body.required - Old password
 * @param {string} newPassword.body.required - New password
 * @returns {object} 200 - success response
 * @returns {Error} 400 - Invalid old password
 */
router.put("/auth/change-password", authMiddleware, changePassword);

/**
 * @route POST /auth/forgot-password
 * @group Auth - Operations about Auth
 * @param {string} email.body.required - User's email
 * @returns {object} 200 - success response
 */
router.post("/auth/forgot-password", forgotPassword);

/**
 * @route POST /auth/reset-password
 * @group Auth - Operations about Auth
 * @param {string} token.body.required - Reset token
 * @param {string} password.body.required - New password
 * @returns {object} 200 - success response
 * @returns {Error} 400 - Invalid or expired token
 */
router.post("/auth/reset-password", resetPassword);

/**
 * @route GET /auth/user/:id
 * @group Auth - Operations about Auth
 * @security JWT
 * @param {string} id.path.required - User ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - User not found
 */
router.get("/auth/user/:id", authMiddleware, getUserById);

module.exports = router;