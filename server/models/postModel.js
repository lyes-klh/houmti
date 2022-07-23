const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
    required: [true, 'Post must have content'],
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

  image: String,

  eventAddress: String,
  eventDate: Date,
  eventHour: String,

  servicePhoneNumber: String,

  pollOptions: [{ option: String, votesCount: Number }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', postSchema);
