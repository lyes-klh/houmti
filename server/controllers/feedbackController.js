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

const feedbackBodySanitization = (feedbackType, body) => {
  console.log(body);
  if (feedbackType !== 'Comment') body.commentContent = undefined;
  if (feedbackType !== 'Vote') body.voteOption = undefined;
  console.log(body);
};

const isValidFeedback = (feedbackType, postType) => {
  if (
    (feedbackType === 'Vote' && postType !== 'poll') ||
    (feedbackType === 'Demand' && postType !== 'service') ||
    (feedbackType === 'Participate' && postType !== 'event')
  )
    return false;
  else return true;
};

const isOptionInPost = (post, body) => {
  const { voteOption } = body;
  let isOptionExists = false;
  const pollOptions = post.pollOptions;
  for (let i = 0; i < pollOptions.length; i++)
    if (pollOptions[i].option === voteOption) {
      isOptionExists = true;
      post.pollOptions[i].votesCount = post.pollOptions[i].votesCount + 1;
      break;
    }
  return isOptionExists;
};

const decrementOptionCount = (post, feedback) => {
  const pollOptions = post.pollOptions;
  for (let i = 0; i < pollOptions.length; i++)
    if (pollOptions[i].option === feedback.votedOption) {
      post.pollOptions[i].votesCount = post.pollOptions[i].votesCount - 1;
      break;
    }
};

exports.createFeedback = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  const feedbackOpt = ['Like', 'Comment', 'Vote', 'Participate', 'Demand'];

  if (!req.body.feedbackType || !feedbackOpt.includes(req.body.feedbackType))
    return next(new AppError('Please provide a valid feedbackType', 400));

  if (!isValidFeedback(req.body.feedbackType, post.postType))
    return next(
      new AppError("Can't perform this feedback on this type of post", 400)
    );
  feedbackBodySanitization(req.body.feedbackType, req.body);

  // Check if this feedback is already performed
  if (req.body.feedbackType !== 'Comment') {
    const performed = await Feedback.findOne({
      post: post._id,
      user: req.user._id,
      feedbackType: req.body.feedbackType,
    });
    if (performed)
      return next(
        new AppError(
          `You already ${req.body.feedbackType}ed this ${post.postType}`,
          400
        )
      );
  }

  if (req.body.feedbackType === 'Comment') {
    if (!req.body.commentContent)
      return next(
        new AppError(
          'Please provide the content of your comment (commentContent)',
          400
        )
      );
  } else if (req.body.feedbackType === 'Vote') {
    if (!req.body.voteOption)
      return next(
        new AppError('Please provide the vote option (voteOption)', 400)
      );
  }

  // Check if voteOption really exists in the post's pollOptions and increment votesCount
  if (req.body.feedbackType === 'Vote') {
    const isOption = isOptionInPost(post, req.body);
    if (!isOption)
      return next(new AppError('This vote option does not exist', 400));
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    post: post._id,
    feedbackType: req.body.feedbackType,
    commentContent: req.body.commentContent,
    votedOption: req.body.voteOption,
  });

  await post.save();

  res.status(201).json({
    status: 'success',
    data: feedback,
  });
});

exports.updateFeedback = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  if (!req.params.feedbackId)
    return next(new AppError('Please provide a feedback id', 400));

  const feedback = await Feedback.findById(req.params.feedbackId);

  if (!feedback) return next(new AppError('This feedback does not exist', 404));

  if (!feedback.user.equals(req.user._id))
    return next(new AppError("You can't update this comment", 403));

  if (feedback.feedbackType === 'Comment' && !req.body.commentContent)
    return next(new AppError('Please provide updated comment content', 400));

  if (feedback.feedbackType === 'Vote' && !req.body.voteOption)
    return next(new AppError('Please provide new vote option', 403));

  if (feedback.feedbackType === 'Vote') {
    if (feedback.votedOption === req.body.voteOption)
      return next(new AppError('You already voted this option', 400));
    // Check if option exist
    // increment new in post
    let isOptionExists = isOptionInPost(post, req.body);
    if (!isOptionExists)
      return next(new AppError('This vote option does not exist', 404));

    // decrement old in post
    // update feedback
    decrementOptionCount(post, feedback);
    feedback.votedOption = req.body.voteOption;
  } else if (feedback.feedbackType === 'Comment') {
    feedback.commentContent = req.body.commentContent;
  }

  const updatedComment = await feedback.save();
  const updatedPost = await post.save();

  res.status(201).json({
    status: 'success',
    data: updatedComment,
  });
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  const feedback = await Feedback.findById(req.params.feedbackId);

  if (!feedback) return next(new AppError('This feedback does not exist', 404));
  if (!feedback.user.equals(req.user._id) && !req.user.isAdmin)
    return next(new AppError("You can't delete this feedback", 403));

  // If a feedback is a vote we decrement the option in post
  decrementOptionCount(post, feedback);

  await Feedback.findByIdAndDelete(feedback._id);
  await post.save();

  res.status(204).json({
    status: 'success',
  });
});
