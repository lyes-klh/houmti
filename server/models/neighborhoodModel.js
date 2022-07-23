const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
  neighborhoodName: {
    type: String,
    required: [true, 'Neighborhood must have a name'],
  },

  city: {
    type: mongoose.Schema.ObjectId,
    ref: 'City',
  },
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);
