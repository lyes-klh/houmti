const User = require('../models/userModel.js');
const City = require('../models/cityModel.js');
const Neighborhood = require('../models/neighborhoodModel.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

exports.getUserInfo = catchAsync(async (req, res, next) => {
  user = await User.findById(req.params.id);
  if (!user) return next(new AppError('This user does not exist', 400));

  const userInfo = {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    city: user.city,
    neighborhood: user.neighborhood,
    avatar: user.avatar,
  };

  res.status(200).json({
    status: 'success',
    data: {
      user: userInfo,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // check if city or neighborhood really exists (we assume we have their ids)
  // if id format is not good, a CastError will be thrown by finById, else it will search

  const { city, neighborhood } = req.body;
  if (city) {
    const cityToUpdate = await City.findById(city);

    if (!cityToUpdate) req.body.city = undefined;
  }
  if (neighborhood) {
    const neighborhoodToUpdate = await Neighborhood.findById(neighborhood);
    if (!neighborhoodToUpdate) {
      req.body.neighborhood = undefined;
    }
  }

  const userUpdated = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city: req.body.city,
      neighborhood: req.body.neighborhood,
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: userUpdated,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let users = new APIFeatures(
    User.find().select('+password +banned +isAdmin'),
    req.query
  )
    .filter()
    .sort()
    .project()
    .paginate();

  users = await users.DBQuery;

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.updateAnyUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+password');
  if (!user) return next(new AppError('This user does not exist', 400));

  // these fields need validation and pre middlware
  if (req.body.password) user.password = req.body.password;
  if (req.body.email) user.email = req.body.email;

  await user.save();

  req.body.password = undefined;
  req.body.email = undefined;

  //even admin won't modify those
  req.body.passwordChangedAt = undefined;
  req.body.resetToken = undefined;
  req.body.resetTokenExpires = undefined;

  // rest of fields does not need validation
  const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteAnyUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+isAdmin');
  if (!user) return next(new AppError('This user does not exist', 400));

  if (user.isAdmin)
    return next(new AppError("You can't perform this action", 403));

  await User.findByIdAndDelete(user._id);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Deleted',
    },
  });
});