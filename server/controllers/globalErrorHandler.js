const AppError = require('../utils/AppError');

const handleDuplicateDB = (err) => {
  return new AppError(
    `this value of "${Object.keys(err.keyPattern)[0]}" already exists`,
    400
  );
};

const handleValidationDB = (err) => {
  return new AppError(`Invalid input ${Object.keys(err.errors)}`, 400);
};

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid value for ${err.path}: ${err.value}`, 400);
};

const handleInclusionExclusionDB = (err) => {
  return new AppError(err.message, 400);
};

const sendProdError = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode.toString().startsWith('5') ? 'failed' : 'error',
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: 'failed',
      message: 'something went wrong, please try again',
    });
  }
};

const sendDevError = (err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode.toString().startsWith('5') ? 'failed' : 'error',
    error: err,
    name: err.name,
    message: err.message,
    isOperational: err.isOperational === true,
    stacktrace: err.stack,
  });
};

const globalErrorHandler = (error, req, res, next) => {
  // console.log(error.name);

  let err = { ...error };
  err.message = error.message;
  err.name = error.name;

  if (err.code === 11000) err = handleDuplicateDB(err);
  if (err.message.includes('validation')) err = handleValidationDB(err);
  if (err.name === 'CastError') err = handleCastErrorDB(err);
  if (err.code === 31254) err = handleInclusionExclusionDB(err);

  if (process.env.NODE_ENV === 'production') {
    sendProdError(err, res, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendDevError(err, req, res);
  }
};

module.exports = globalErrorHandler;
