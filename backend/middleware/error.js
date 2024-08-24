const { error } = require("console");
const ErrorHandler = require("../utils/errorhandler");


//error handling middleware function
module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Forward to default error handler if headers are already sent
  }
  //default statsCode
  err.statusCode = err.statusCode || 500;
  //default message
  err.message = err.message || "Internal server error";

  //Wrong mongodb ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid path: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Oops! ${Object.keys(err.keyValue)} already exists. Please try again!`;
    err = new ErrorHandler(message, 400)
  }
  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token(JWT) is Invalid. Please try again!`;
    err = new ErrorHandler(message, 400)
  }
  // Expired token error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token(JWT) is expired. Please try again!`;
    err = new ErrorHandler(message, 400)
  }



  res.status(err.statusCode).json({ success: false, message: err.message });

};
