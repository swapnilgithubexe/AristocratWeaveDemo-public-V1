const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto");
const cloudinary = require("cloudinary");


//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });


  const { name, email, password } = req.body
  const user = await User.create({
    name, email, password, avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  });
  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking validation
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);

});

//Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));

  }
  //get password token - req.protocol}://${req.get("host")
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

  const message = `Welcome to AristoCrat Family \n\n
  Your password reset token is :- \n\n ${resetPasswordUrl} \n\n Please ignore if this request wasn't made by you! \n\n Thanks for reaching out to our customer support, Have a great day!`

  try {
    await sendEmail({
      email: user.email,
      subject: `Aristocrat Weave Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler(error.message, 500))
  }
});

//Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 400))
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match, Try again!", 400));
  }
  user.password = req.body.password
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
})

//Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    next(new ErrorHandler(`User with ID: ${req.user.id} does not exist`))
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect!", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match, Check again!", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
})

//Update user Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Check if avatar is provided
  if (req.body.avatar) {
    const user = await User.findById(req.user.id);

    // Remove the existing avatar from Cloudinary if present
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    // Upload the new avatar to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    // Assign the new avatar details to the user data
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  // Update the user in the database
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Send a success response
  res.status(200).json({
    success: true,
    user,
  });
});




//Admin - To get all users array
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  })
})

//Get single user
exports.getSingleUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

//Admin - update user role
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 404))
  }
  res.status(200).json({
    success: true,
    message: "The role has been updated successfully"
  })
})


//Delete a user -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User does not exist with the ID: ${req.params.id}`, 404))
  }

  res.status(200).json({ success: true, message: "User has been deleted successfully" })
})