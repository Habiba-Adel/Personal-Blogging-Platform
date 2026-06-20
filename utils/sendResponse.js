
//here i need to standardized api responses for every endpoint so each one returns a consistent structure 

const sendResponse = (res, { statusCode = 200, success = true, message = null, data = null }) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = sendResponse;