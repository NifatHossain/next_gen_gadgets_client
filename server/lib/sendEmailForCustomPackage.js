const { Resend } = require("resend");
const envConfig = require("../config/env.config");

const resend = new Resend(envConfig.RESEND_API_KEY);

const sendEmailForCustomPackage = async (body) => {
  try {
    const { data, error } = await resend.emails.send({
      from: envConfig.ADMIN_EMAIL,
      to: "abdulalimrakib04@gmail.com", // Replace with the admin's email address
      subject: "New Custom Package Request",
      html: body,
    });

    if (error) {
      console.error(`[error] ${error.message}`);
      return false;
    }

    console.info(`[info] ${JSON.stringify(data)}`);
    return true;
  } catch (err) {
    console.error(`[exception] ${err.message}`);
    return false;
  }
};

module.exports = { sendEmailForCustomPackage };
