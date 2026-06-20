
//we will need this one cause rather than making and using try catch in every controller function that is very bad
//so we can make it more cleaner and use this one 
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = catchAsync;