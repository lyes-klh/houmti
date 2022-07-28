const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Notification must have an actor'],
    },

    notifier: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Notification must have be sent to a notifier'],
    },

    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Notification must be related to a post'],
    },

    feedback: {
      type: mongoose.Schema.ObjectId,
      ref: 'Feedback',
      required: [true, 'Notification must be triggered by a feedback'],
    },

    notificationType: {
      type: String,
      enum: ['create', 'update'],
      required: [true, 'Notification must have a type'],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

notificationSchema.pre(/^find/, function (next) {
  this.populate('actor', 'firstname lastname avatar')
    .populate('post', 'postType title')
    .populate('feedback', 'feedbackType');

  next();
});

notificationSchema.virtual('message').get(function () {
  const prep = ['Vote', 'Comment', 'Participate'].includes(
    this.feedback.feedbackType
  )
    ? ' on'
    : '';
  const verb = this.feedback.feedbackType.toLowerCase();
  const verbForm = verb.charAt(verb.length - 1) === 'e' ? 'd' : 'ed';
  const message = `${this.actor.firstname} ${this.actor.lastname} ${verb}${verbForm}${prep} your ${this.post.postType}`;
  return message;
});

module.exports = mongoose.model('Notification', notificationSchema);
