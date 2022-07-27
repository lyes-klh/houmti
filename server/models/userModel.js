const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'User must have a firstname'],
    minLength: 2,
  },
  lastname: {
    type: String,
    required: [true, 'User must have a lastname'],
    minLength: 2,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please give a valid email address',
    ],
  },

  avatar: String,

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    minLength: 8,
  },

  city: {
    type: mongoose.Schema.ObjectId,
    ref: 'City',
    required: [true, 'User must be attched to a city'],
  },

  neighborhood: {
    type: mongoose.Schema.ObjectId,
    ref: 'Neighborhood',
  },

  banned: {
    type: Boolean,
    default: false,
    select: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
    select: false,
  },

  passwordChangedAt: Date,

  resetToken: String,
  resetTokenExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);
