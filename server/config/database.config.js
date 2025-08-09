const mongoose = require("mongoose")
const envConfig = require("./env.config")

const connectDB = async () => {
  try {
    if (!envConfig.DATABASE_URI) {
      console.error("DATABASE_URI is not defined in environment variables")
      process.exit(1)
    }

    const conn = await mongoose.connect(envConfig.DATABASE_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("Database connection error:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
