const mongoose = require('mongoose');

const pollOptionsSchema = new mongoose.Schema({
  option: {
    type: String,
    required: [true, 'You must specify an option'],
    minLength: 1,
  },
  votesCount: {
    type: Number,
    default: 0,
    required: [true, 'Must specify the votes number'],
  },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 1,
    },

    content: {
      type: String,
      required: [true, 'Post must have content'],
      minLength: 1,
    },

    postType: {
      type: String,
      required: [true, 'Post must have a type'],
      enum: ['post', 'event', 'poll', 'service'],
      default: 'post',
    },

    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must have a creator'],
    },

    city: {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
      required: [true, 'Post belong to a city'],
    },

    neighborhood: {
      type: mongoose.Schema.ObjectId,
      ref: 'Neighborhood',
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    image: String,
    withImage: {
      type: Boolean,
      default: false,
    },

    eventAddress: String,
    eventDate: Date,
    eventHour: String,
    participationsCount: Number,

    servicePhoneNumber: String,
    demandsCount: Number,

    pollOptions: {
      type: [pollOptionsSchema],
      validate: {
        validator: (options) => {
          if (options.length !== 0)
            return options.length >= 2 && options.length <= 10;
        },
        message: () => 'Number of options must be between 2 and 10',
      },
    },
  },
  { timestamps: true }
);

postSchema.pre('save', function (next) {
  if (this.isNew) {
    if (this.postType === 'event') this.participationsCount = 0;
    else if (this.postType === 'service') this.demandsCount = 0;
  }

  next();
});

postSchema.pre(/^find/, function (next) {
  this.populate('creator', 'firstname lastname avatar')
    .populate('city', 'cityName')
    .populate('neighborhood', 'neighborhoodName');

  next();
});

module.exports = mongoose.model('Post', postSchema);
