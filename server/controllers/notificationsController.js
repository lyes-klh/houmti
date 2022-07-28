const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

exports.getUserNotifications = catchAsync(async (req, res, next) => {
  let notifications = new APIFeatures(
    Notification.find({ notifier: req.user._id }),
    req.query
  )
    .filter()
    .project()
    .sort()
    .paginate();

  notifications = await notifications.DBQuery;

  res.status(200).json({
    status: 'success',
    data: {
      notifications,
    },
  });
});

exports.changeNotificationStatus = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification)
    return next(new AppError('This notification does not exist', 404));

  if (!req.body.isRead)
    return next(
      new AppError('Please provide the new notification status', 400)
    );

  notification.isRead = req.body.isRead;
  await notification.save();

  res.status(200).json({
    status: 'success',
    data: {
      notification,
    },
  });
});
