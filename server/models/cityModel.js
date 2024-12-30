const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, "City must have a name"],
  },

  zipCode: {
    type: Number,
    unique: true,
  },

  countryName: {
    type: String,
    required: [true, "City must belong to a country"],
  },

  countryISOCode: {
    type: String,
    required: [true, "Country must have an ISO code"],
  },

  countryCode: {
    type: String,
    required: [true, "Country must have a phone code"],
  },
});

module.exports = mongoose.model("City", citySchema);
