const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  level: {
    type: Number,
    min: [1, "Error: level should be between 1 and 5"],
    max: [5, "Error: level should be between 1 and 5"],
    required: [true, "Error: level is required"],
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
