const City = require('../models/cityModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/AppError');

exports.getAllCities = catchAsync(async (req, res, next) => {
  let cities = new APIFeatures(City.find(), req.query)
    .filter()
    .project()
    .sort()
    .paginate();

  cities = await cities.DBQuery;

  res.status(200).json({
    status: 'success',
    data: cities,
  });
});

exports.createCity = catchAsync(async (req, res, next) => {
  const city = await City.create(req.body);

  res.status(200).json({
    status: 'success',
    data: city,
  });
});

exports.updateCity = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError('Please provide a city id', 400));

  const city = await City.findById(req.params.id);
  if (!city) return next(new AppError('This city does not exist', 400));

  const updatedCity = await City.findByIdAndUpdate(city._id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedCity,
  });
});

exports.deleteCity = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError('Please provide a city id', 400));

  const city = await City.findById(req.params.id);
  if (!city) return next(new AppError('This city does not exist', 400));

  await City.findByIdAndDelete(city._id);

  res.status(204).json({
    status: 'success',
  });
});
