const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

exports.getAllPostFeedback = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  let postFeedback = new APIFeatures(
    Feedback.find({ post: req.params.id }),
    req.query
  )
    .filter()
    .sort()
    .project()
    .paginate();

  postFeedback = await postFeedback.DBQuery;

  res.status(200).json({
    status: 'success',
    data: postFeedback,
  });
});

exports.createFeedback = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  if (req.body.feedbackType === 'Like') {
    const liked = await Feedback.findOne({
      post: post._id,
      user: req.user._id,
      feedbackType: 'Like',
    });

    if (liked) return next(new AppError('You already liked this post', 400));

    req.body.commentContent = undefined;
  } else if (req.body.feedbackType === 'Comment') {
    if (!req.body.commentContent)
      return next(
        new AppError(
          'Please provide the content of your comment (commentContent)',
          400
        )
      );
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    post: post._id,
    feedbackType: req.body.feedbackType,
    commentContent: req.body.commentContent,
  });

  res.status(201).json({
    status: 'success',
    data: feedback,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  if (!req.params.feedbackId)
    return next(new AppError('Please provide a feedback id', 400));

  const feedback = await Feedback.findOne({
    _id: req.params.feedbackId,
    post: post._id,
    feedbackType: 'Comment',
  });

  if (!feedback) return next(new AppError('This comment does not exist', 404));
  if (!feedback.user.equals(req.user._id))
    return next(new AppError("You can't update this comment", 403));
  if (!req.body.commentContent)
    return next(new AppError('Please provide new comment content', 403));

  feedback.commentContent = req.body.commentContent;
  const updatedComment = await feedback.save();

  res.status(201).json({
    status: 'success',
    data: updatedComment,
  });
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  const feedback = await Feedback.findOne({
    _id: req.params.feedbackId,
    post: post._id,
  });

  if (!feedback) return next(new AppError('This feedback does not exist', 404));
  if (!feedback.user.equals(req.user._id) && !req.user.isAdmin)
    return next(new AppError("You can't delete this feedback", 403));

  await Feedback.findByIdAndDelete(feedback._id);

  res.status(204).json({
    status: 'success',
  });
});
