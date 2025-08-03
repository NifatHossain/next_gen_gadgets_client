const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env')
});

const envConfig = {
  PORT: process.env.PORT || 3002,
  DATABASE_URI: process.env.DATABASE_URI,
  AUTH_SECRET: process.env.AUTH_SECRET,
  API_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  SALT_ROUND: process.env.SALT_ROUND || 10, 
  OTP_VALIDITY: process.env.OTP_VALIDITY || 5,
  NEXT_BUILD: process.env.NEXT_BUILD || undefined,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = envConfig;
