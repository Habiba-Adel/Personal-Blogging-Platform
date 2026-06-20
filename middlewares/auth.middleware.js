const jwt = require("jsonwebtoken");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in", 401));
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    req.user = decoded;

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = protect;