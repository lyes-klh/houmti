const Neighborhood = require('../models/neighborhoodModel');
const City = require('../models/cityModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/AppError');

exports.getAllNeighborhoods = catchAsync(async (req, res, next) => {
  let neighborhoods = new APIFeatures(Neighborhood.find(), req.query)
    .filter()
    .project()
    .sort()
    .paginate();

  neighborhoods = await neighborhoods.DBQuery;

  res.status(200).json({
    status: 'success',
    data: neighborhoods,
  });
});

exports.createNeighborhood = catchAsync(async (req, res, next) => {
  // check if city exists
  const city = await City.findById(req.body.city);
  if (!city) return next(new AppError('This city does not exist'), 400);

  const neighborhood = await Neighborhood.create(req.body);

  res.status(200).json({
    status: 'success',
    data: neighborhood,
  });
});

exports.updateNeighborhood = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError('Please provide a neighborhood id', 400));

  const neighborhood = await Neighborhood.findById(req.params.id);
  if (!neighborhood)
    return next(new AppError('This neighborhood does not exist', 400));

  if (req.body.city) {
    const city = await City.findById(req.body.city);
    if (!city) return next(new AppError('This city does not exist'), 400);
  }

  const updatedNeighborhood = await Neighborhood.findByIdAndUpdate(
    neighborhood._id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: updatedNeighborhood,
  });
});

exports.deleteNeighborhood = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError('Please provide a neighborhood id', 400));

  const neighborhood = await Neighborhood.findById(req.params.id);
  if (!neighborhood)
    return next(new AppError('This neighborhood does not exist', 400));

  await Neighborhood.findByIdAndDelete(neighborhood._id);

  res.status(204).json({
    status: 'success',
  });
});
