const sendResponse = require("../utils/sendResponse");

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  sendResponse(res, {
    statusCode,
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = globalErrorHandler;