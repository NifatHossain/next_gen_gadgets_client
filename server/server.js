const app = require("./app")
const connectDB = require("./config/database.config")
const envConfig = require("./config/env.config")

// Create Server
app.listen(envConfig.PORT, () => {
  console.log(`🚀 Server running on port ${envConfig.PORT}!`)
  console.log(`📚 API Documentation: http://localhost:${envConfig.PORT}/docs`)
  console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`)

  // connect mongo DB
  connectDB()
})
