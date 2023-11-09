const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  address: String,
  phone_number: {
    type: String,
    unique: true
  },
  required_pass_level: Number,
  required_age_level: Number
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
