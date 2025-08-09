/**
 * Success response decorator class
 */
class SuccessResponse {
  constructor(message, statusCode, data) {
    this.success = true
    this.message = message
    this.statusCode = statusCode
    this.data = data || null
  }
}

module.exports = SuccessResponse
