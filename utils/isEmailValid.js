const { validate } = require("deep-email-validator");

const isEmailValid = async (email) => {
  const options = {
    email,
    validateSMTP: false,
  };
  const info = await validate(options);
  if (info.reason === "mx") {
    throw new Error("Please check your internet connection");
  }

  return info.valid;
};
module.exports = isEmailValid;
