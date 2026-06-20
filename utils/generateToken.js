const jwt = require("jsonwebtoken");
const config = require("../config/env");

const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};

module.exports = generateToken;