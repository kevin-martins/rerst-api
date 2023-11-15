const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pass_id: String,
  first_name: {
    type: String,
    min: [2, "Error: first name should at least be of size 2"],
    required: [true, "Error: first name is required"],
  },
  last_name: {
    type: String,
    min: [2, "Error: last name should at least be of size 2"],
    required: [true, "Error: last name is required"],
  },
  age: {
    type: Number,
    required: [true, "Error: age is required"],
  },
  phone_number: {
    type: String,
    required: [true, "Error: phone number is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Error: password is required"],
    min: [8, "Error: password should at least be of size 8"]
  },
  address: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
