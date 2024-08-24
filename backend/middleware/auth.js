const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

exports.authorizeRoles = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return next(new ErrorHandler("User is not authenticated", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 403));
    }

    next();
  }
}


