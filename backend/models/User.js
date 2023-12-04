const mongoose = require('mongoose');
const { normalisePhoneNumber } = require('../helpers/helpers')

const userSchema = new mongoose.Schema({
  pass_id: String,
  first_name: {
    type: String,
    required: true,
    match: /^[a-zA-Z]*(\s[A-Za-z]*)?$/
  },
  last_name: {
    type: String,
    required: true,
    match: /^[a-zA-Z]*(\s[A-Za-z]*)?$/
  },
  age: {
    type: Number,
    min: [18, "Error: the age should be upper than 17"],
    max: [150, "Error: the age should be lower than 151"],
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    match: /^(?:\+33\s?|0)[1-9](\s?\d{2}){4}$/
  },
  password: {
    type: String,
    required: true
  },
  address: String
});

userSchema.pre('save', function (next) {
  if (this.phone_number) {
    this.phone_number = normalisePhoneNumber(this.phone_number);
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
    if (update.phone_number) {
        update.phone_number = normalisePhoneNumber(update.phone_number);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
