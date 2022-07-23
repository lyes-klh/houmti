const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'User must have a firstname'],
  },
  lastname: {
    type: String,
    required: [true, 'User must have a lastname'],
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

  banned: {
    type: Boolean,
    default: false,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  console.log(`password successfully hashed for user : ${this}`);
});

module.exports = mongoose.model('User', userSchema);
