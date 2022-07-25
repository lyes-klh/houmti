const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');

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
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
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
    city: req.body.city,
    neighborhood: req.body.neighborhood,
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

  // check if user still exist
  const user = await User.findById(decoded.userId).select('+isAdmin');
  if (!user)
    return next(
      new AppError('This user does not exist, please login to continue', 401)
    );

  // check if user changed password after jwt was issued
  const changedPassword = user.passwordChangedAt > decoded.iat * 1000;

  if (changedPassword)
    return next(new AppError('This token is not valid anymore', 401));

  req.user = user;

  next();
});

const randomBytes = (size) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    });
  });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError('Please provide your email', 400));

  const user = await User.findOne({ email });
  if (!user)
    return next(
      new AppError('Email provided does not match with any account', 400)
    );

  // create and save hashed token
  let resetToken = await randomBytes(16);
  resetToken = resetToken.toString('hex');
  const resetTokenHashed = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetToken = resetTokenHashed;
  user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  // we send the unhashed token via email
  const resetURL = `${req.protocol}://${req.hostname}${req.baseUrl}/resetPassword/${resetToken}`;
  htmlBody = `<div>
  <h1>Reset you password : </h1>
  <p><a href="${resetURL}">${resetURL}</a></p>
  </div>`;

  try {
    const options = {
      from: '"Houmti Admin" admin@houmti.com',
      to: `${email}`,
      subject: `Houmti: Reset Your Password`,
      text: resetURL,
      html: htmlBody,
    };

    await sendEmail(options);

    res.json({
      status: 'success',
      data: {
        message: 'Email sent successfully',
      },
    });
  } catch (err) {
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return next(new AppError("Couldn't send email, please try again", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword)
    return next(
      new AppError('Please provide your email and a new password', 400)
    );

  const { token } = req.params;
  if (!token)
    return next(
      new AppError(
        'Please provide a password reset token in the url parameters',
        400
      )
    );

  const user = await User.findOne({ email });
  if (!user) return next(new AppError('This user does not exist', 400));

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const correctToken = user.resetToken === hashedToken;
  if (!correctToken || Date.now() > user.resetTokenExpires)
    return next(
      new AppError(`This reset token is not valid ${hashedToken}`, 400)
    );

  user.password = newPassword;
  user.passwordChangedAt = Date.now() - 1000;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  await createAndSendJWT(user, res, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password: currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return next(
      new AppError('Please provide your current and new password', 400)
    );

  const user = await User.findById(req.user._id).select('+password');

  const passwordChecked = await bcrypt.compare(currentPassword, user.password);

  if (!passwordChecked)
    return next(new AppError('Your password is wrong, please try again', 401));

  user.password = newPassword;
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();

  await createAndSendJWT(user, res, 200);
});

exports.restrictToAdmin = catchAsync(async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(new AppError("You can't access this route", 403));
  next();
});
