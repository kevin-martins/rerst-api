const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  address: String,
  phone_number: {
    type: String,
    unique: true
  },
  required_pass_level: {
    type: Number,
    required: [true, "Error: pass level is required"],
  },
  required_age_level: {
    type: Number,
    required: [true, "Error: age level is required"],
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
