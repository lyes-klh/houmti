const globalErrorHandler = (err, req, res, next) => {
  console.log('error handler executed !!!!!!!!!');

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode.toString().startsWith('5') ? 'failed' : 'error',
    data: {
      message: err.message,
      isOperational: err.isOperational === true,
    },
  });
};

module.exports = globalErrorHandler;
