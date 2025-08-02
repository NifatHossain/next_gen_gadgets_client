/**
 * Error Response decorator class
 */

class ErrorResponse extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.data = data || null;

    // Preserve the prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture the stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ErrorResponse;
