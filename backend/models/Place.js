const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  address: String,
  phone_number: {
    type: String,
    unique: true,
    match: /^(?:\+33\s?|0)[1-9](\s?\d{2}){4}$/
  },
  required_pass_level: {
    type: Number,
    min: [1, "Error: the pass should be upper than 0"],
    max: [5, "Error: the pass should be lower than 6"],
    required: true
  },
  required_age_level: {
    type: Number,
    min: [18, "Error: the age should be upper than 17"],
    max: [150, "Error: the age should be lower than 151"],
    required: true
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
