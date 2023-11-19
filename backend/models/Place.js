const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  address: String,
  phone_number: {
    type: String,
    unique: true
  },
  required_pass_level: {
    type: Number,
    min: [1, "Error: pass should be between 1 and 5"],
    max: [5, "Error: pass should be between 1 and 5"],
    required: [true, "Error: pass level is required"],
  },
  required_age_level: {
    type: Number,
    min: [18, "Error: you should be over or equal 18 "],
    max: [150, "Error: you can't be this old"],
    required: [true, "Error: age level is required"],
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
