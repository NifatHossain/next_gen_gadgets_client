const { z } = require("zod")
const ErrorResponse = require("../utils/ErrorResponse")

// Validation middleware
const validateMiddleware = (schema) => (req, res, next) => {
  try {
    // Parse request body with the provided schema

    console.log("Validating request body:", req.body);

    
    
    schema.parse(req.body)
    next() // Proceed if no validation errors
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Custom formatting of the validation error
      const formattedErrors = error.errors.reduce((acc, err) => {
        const fieldName = err.path.join(".")
        // Default to a more detailed message for required fields
        acc[fieldName] = err.message === "Required" ? `${fieldName} is required` : err.message
        return acc
      }, {})

      const response = new ErrorResponse("Validation error", 400, formattedErrors)

      // Send a response with custom error format
      return res.status(response.statusCode).json(response)
    }
    next(error)
  }
}

module.exports = validateMiddleware
