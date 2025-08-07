const app = require("./app")
// const connectDB = require("./config/database.config")
const envConfig = require("./config/env.config")

// Connect to MongoDB
// connectDB()

// Create Server
app.listen(envConfig.PORT, () => {
  console.log(`Server running on: http://localhost:${envConfig.PORT}`)
  console.log(`API Documentation running on: http://localhost:${envConfig.PORT}/docs`)
})
