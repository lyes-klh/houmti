const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//Sign JWT Async
const signJWT = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, process.env.JWT_KEY, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

// Verify JWT Async
const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

// Create and send token
const createAndSendJWT = catchAsync(async (user, res, statusCode) => {
  // create token and attach it to an http cookie
  const token = await signJWT(user._id);

  const cookieOptions = {
    httpOnly: true,
    maxAge: Date.now() + 24 * 3600 * 1000,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('token', token, cookieOptions);

  // return response
  user.banned = undefined;
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { message: 'logged in successfully', user },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  // create the new user + hashing the password in the pre save middleware
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  await createAndSendJWT(newUser, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError('Wrong email or password', 400));

  // check password

  const passwordChecked = await bcrypt.compare(password, user.password);

  if (!passwordChecked)
    return next(new AppError('Wrong email or password', 400));

  await createAndSendJWT(user, res, 200);
});

exports.logout = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new AppError('You are not logged in', 400));
  res.clearCookie('token');

  res.status(200).json({
    status: 'success',
    data: {
      message: 'logged out successfully',
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next(
      new AppError('You are not logged in, please login to continue', 401)
    );

  const decoded = await verifyJWT(token);
  if (!decoded)
    return next(
      new AppError('You are not logged in, please login to continue', 401)
    );

  next();
});
