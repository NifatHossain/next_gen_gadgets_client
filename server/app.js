require("dotenv").config();

const express = require("express");
const { swaggerUi } = require("./config/swagger.config");
const swaggerOutput = require("./swagger/swagger_docs.json");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware.js");
// Import routes
const authRoutes = require("./routes/auth.routes.js");

// Initialize Express app
const app = express();

// Test route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to NextGenGadgets API",
    version: "1.0.0",
  });
});

// CORS middleware
app.use(
  cors({
    credentials: true,
  })
);

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API router
const apiV1Router = express.Router();

// Use routes
apiV1Router.use(authRoutes);

// Common API routes
app.use("/api/v1", apiV1Router);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Error middleware
app.use(errorHandler);

module.exports = app;
