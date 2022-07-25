const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+isAdmin');
  let initialQueryOption = {};

  if (!user.isAdmin) {
    // Only search posts for the user's city or neighborhood
    if (req.user.neighborhood)
      initialQueryOption = { neighborhood: req.user.neighborhood };
    else initialQueryOption = { city: req.user.city };
  }

  let posts = new APIFeatures(Post.find(initialQueryOption), req.query)
    .filter()
    .sort()
    .project()
    .paginate();
  posts = await posts.DBQuery;

  res.status(201).json({
    status: 'success',
    data: posts,
  });
});

const postBodySanitization = (postType, body) => {
  if (postType !== 'event') {
    body.eventAddress = undefined;
    body.eventDate = undefined;
    body.eventHour = undefined;
  }

  if (postType !== 'poll') {
    body.pollOptions = undefined;
  }
  if (postType !== 'service') {
    body.servicePhoneNumber = undefined;
  }
};

exports.createPost = catchAsync(async (req, res, next) => {
  const { postType } = req.body;

  if (!postType)
    return next(new AppError('Please provide a value of postType', 400));

  if (
    (postType === 'event') &
    (!req.body.eventAddress || !req.body.eventDate || !req.body.eventHour)
  )
    return next(
      new AppError(
        'Please provide all event informations (eventAddress, eventDate, eventHour)',
        400
      )
    );

  if ((postType === 'poll') & !req.body.pollOptions)
    return next(new AppError('Please provide poll options (polOptions)', 400));

  if ((postType === 'service') & !req.body.servicePhoneNumber)
    return next(
      new AppError(
        'Please provide service phone number (servicePhoneNumber)',
        400
      )
    );
  postBodySanitization(postType, req.body);

  const post = await Post.create({
    ...req.body,
    creator: req.user._id,
    city: req.user.city,
    neighborhood: req.user.neighborhood,
  });

  res.status(201).json({
    status: 'success',
    data: post,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('This post does not exist', 400));

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('This post does not exist', 400));

  if (!post.creator.equals(req.user._id))
    return next(new AppError("You can't edit this post", 401));

  postBodySanitization(post.postType, req.body);
  req.body.postType = undefined;
  req.body.creator = undefined;
  req.body.city = undefined;
  req.body.neighborhood = undefined;
  req.body.createdAt = undefined;
  req.body.updateddAt = undefined;

  const updatedPost = await Post.findByIdAndUpdate(post._id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedPost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return next(new AppError('This post does not exist', 400));

  const user = await User.findById(req.user._id).select('+isAdmin');

  if (!user.isAdmin)
    if (!post.creator.equals(req.user._id))
      return next(new AppError("You can't delete this post", 401));

  await Post.findByIdAndDelete(post._id);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Post deleted successfully',
    },
  });
});
