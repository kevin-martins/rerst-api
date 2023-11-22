const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pass_id: String,
  first_name: {
    type: String,
    required: [true, "Error: first name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Error: last name is required"],
  },
  age: {
    type: Number,
    min: [18, "Error: you should be over or equal 18 "],
    max: [150, "Error: you can't be this old"],
    required: [true, "Error: age is required"],
  },
  phone_number: {
    type: String,
    required: [true, "Error: phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Error: password is required"],
  },
  address: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
