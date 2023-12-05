const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  level: {
    type: Number,
    min: [1, "Error: the pass should be upper than 0"],
    max: [5, "Error: the pass should be lower than 6"],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },

});

const Pass = mongoose.model('Pass', passSchema);

module.exports = Pass;
