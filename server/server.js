const app = require("./app");
const connectDB = require("./config/database.config");
const envConfig = require("./config/env.config");

// Create Server
app.listen(envConfig.PORT, () => {
  console.log(`Server running on: http://localhost:${envConfig.PORT}`);
  console.log(`API Documentation running on: http://localhost:${envConfig.PORT}/docs`);

  // Connect to MongoDB
  // connectDB();

  // Start message count scheduler
  // startMessageCountJob();
});
