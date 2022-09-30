const Post = require('../models/postModel');
const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');
const multerConfig = require('../utils/multerConfig');

const attachCurrentUserFeedback = async (posts, user) => {
  for (let post of posts) {
    const params = { user: user._id, post: post._id };

    const like = await Feedback.find({
      ...params,
      feedbackType: 'Like',
    });

    if (like.length !== 0) post.liked = true;

    if (post.postType === 'poll') {
      const vote = await Feedback.find({
        ...params,
        feedbackType: 'Vote',
      });

      if (vote.length !== 0) {
        post.voted = true;
        post.votedOption = vote[0].votedOption;
      }
    }

    if (post.postType === 'event') {
      const participation = await Feedback.find({
        ...params,
        feedbackType: 'Participate',
      });

      if (participation.length !== 0) post.participated = true;
    }

    if (post.postType === 'service') {
      const demand = await Feedback.find({
        ...params,
        feedbackType: 'Demand',
      });

      if (demand.length !== 0) post.demanded = true;
    }
  }
};

exports.getAllPosts = catchAsync(async (req, res, next) => {
  let initialQueryOption = {};

  if (!req.user.isAdmin || !req.body.profilePosts) {
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

  // attach the currentUser feedback for each post
  posts = JSON.parse(JSON.stringify(posts));

  await attachCurrentUserFeedback(posts, req.user);

  res.status(200).json({
    status: 'success',
    data: posts,
  });
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  let posts = new APIFeatures(Post.find({ creator: req.user._id }), req.query)
    .filter()
    .sort()
    .project()
    .paginate();
  posts = await posts.DBQuery;

  res.status(200).json({
    status: 'success',
    data: posts,
  });
});

const postBodySanitization = (postType, body) => {
  body.participationsCount = undefined;
  body.demandsCount = undefined;

  if (postType !== 'event') {
    body.eventAddress = undefined;
    body.eventDate = undefined;
    body.eventHour = undefined;
  }
  if (postType !== 'poll') body.pollOptions = undefined;
  if (postType !== 'service') body.servicePhoneNumber = undefined;

  if (postType !== 'post') {
    body.image = undefined;
    body.withImage = undefined;
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

  if (
    (postType === 'poll') &
    (!req.body.pollOptions ||
      req.body.pollOptions.length < 2 ||
      !req.body.pollOptions.every((i) => typeof i === 'string'))
  )
    return next(
      new AppError(
        'Please provide an array (of strings) of minimum 2 poll options (pollOptions)',
        400
      )
    );

  if ((postType === 'service') & !req.body.servicePhoneNumber)
    return next(
      new AppError(
        'Please provide service phone number (servicePhoneNumber)',
        400
      )
    );
  postBodySanitization(postType, req.body);

  if (postType === 'poll') {
    let pollOptions = [];
    for (let i = 0; i < req.body.pollOptions.length; i++) {
      const pollOption = {};
      pollOption.option = req.body.pollOptions[i];
      pollOptions.push(pollOption);
    }
    req.body.pollOptions = pollOptions;
  }

  const createdPost = await Post.create({
    ...req.body,
    creator: req.user._id,
    city: req.user.city._id,
    neighborhood: req.user.neighborhood._id,
  });

  const user = await User.findById(req.user._id);
  user.postsCount = user.postsCount + 1;
  await user.save();

  const post = await Post.findById(createdPost._id);

  res.status(201).json({
    status: 'success',
    data: post,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 400));

  if (
    !post.city._id.equals(req.user.city._id) &&
    !post.neighborhood._id.equals(req.user.neighborhood._id)
  )
    return next(new AppError('This post is not available for you', 400));

  post = JSON.parse(JSON.stringify(post));
  post = [post];

  await attachCurrentUserFeedback(post, req.user);

  res.status(200).json({
    status: 'success',
    data: post[0],
  });
});

const upload = multerConfig('posts', 2000000);
exports.uploadImage = upload.single('image');

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 404));

  if (!post.creator.equals(req.user._id))
    return next(new AppError("You can't edit this post", 403));

  let image = undefined;
  if (req.file && post.postType === 'post' && post.withImage && !post.image)
    image = req.file.filename;
  else if (req.file)
    return next(new AppError("You can't upload an image to this post", 400));

  postBodySanitization(post.postType, req.body);
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.eventAddress = req.body.eventAddress || post.eventAddress;
  post.eventDate = req.body.eventDate || post.eventDate;
  post.eventHour = req.body.eventHour || post.eventHour;
  post.servicePhoneNumber =
    req.body.servicePhoneNumber || post.servicePhoneNumber;
  post.image = image || post.image;

  const updatedPost = await post.save();

  res.status(200).json({
    status: 'success',
    data: updatedPost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('This post does not exist', 400));

  if (!req.user.isAdmin && !post.creator.equals(req.user._id))
    return next(new AppError("You can't delete this post", 403));

  await Post.findByIdAndDelete(post._id);
  await Feedback.deleteMany({ post: post._id });
  // delete notifications

  res.status(204).json({
    status: 'success',
    data: {
      message: 'Post deleted successfully',
    },
  });
});
