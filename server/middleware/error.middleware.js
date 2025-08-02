const mongoose = require('mongoose');
const ErrorResponse = require('../utils/ErrorResponse');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to the console for the developer
  console.error(err);

  // Handle Mongoose's "CastError" (invalid ObjectId or resource not found)
  if (err instanceof mongoose.Error.CastError) {
    const message = `Resource not found with ID: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Handle Mongoose's "ValidationError" (schema validation failure)
  if (err instanceof mongoose.Error.ValidationError) {
    // Collect validation errors in an object
    const data = {};
    for (const [key, value] of Object.entries(err.errors)) {
      data[key] = value.message;
    }
    error = new ErrorResponse('Validation error', 400, data);
  }

  // Handle Mongoose's "Duplicate key" error (duplicate unique fields)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // General error handler for other cases
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
    data: error.data || null,
  });
};

module.exports = errorHandler;
