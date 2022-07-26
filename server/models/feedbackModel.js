const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Feedback must be created by a user'],
    },

    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Feedback must be created on a post'],
    },

    feedbackType: {
      type: String,
      required: [true, 'Feedback must have a type'],
      enum: ['Like', 'Comment', 'Participate', 'Demand', 'Vote'],
    },

    commentContent: {
      type: String,
      minLength: 1,
    },

    votedOption: {
      type: String,
      minLength: 1,
    },
  },
  { timestamps: true }
);

feedbackSchema.pre(/^find/, function (next) {
  this.populate('user', 'firstname lastname avatar');

  next();
});

module.exports = mongoose.model('Feedback', feedbackSchema);
