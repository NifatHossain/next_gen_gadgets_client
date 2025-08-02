require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database.config.js");
const { swaggerUi } = require("./config/swagger.config.js");
const swaggerOutput = require("./swagger/swagger_docs.json");
const errorHandler = require("./middleware/error.middleware.js");

// Initialize Express app
const app = express();

// Test route
app.use("/test", (req, res) => {
  res.send("Welcome to Next Gen Gadgets");
});

// CORS middleware
app.use(cors({ credentials: true }));

// JSON parser
app.use(express.json());

// API router
const apiV1Router = express.Router();

// Use API routes
app.use("/api/v1", apiV1Router);

// Error middleware
app.use(errorHandler);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

module.exports = app;
