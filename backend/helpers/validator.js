const { User } = require('../models');
const { normalisePhoneNumber } = require('./helpers')

const isPhoneNumberUnique = (obj, phoneNumber) => {
  for (let { phone_number } of obj) {
    if (phone_number === normalisePhoneNumber(phoneNumber)) {
      return false;
    }
  }
  return true;
}

const isLevelValid = (level) => {
  if (level > 5 || level < 1) {
    return false;
  }
  return true;
}

const isPlaceAccessValid = (userAge, placeAge, passLevel, placeLevel) => {
  if (userAge < placeAge || passLevel < placeLevel) {
    return false;
  }
  return true;
}

const isAgeValid = (age) => {
  if (age > 150 || age < 18) {
    return false;
  }
  return true;
}

const isObjectKeysDefined = (obj, keys) => {
  for (const key of keys) {
    if (!(key in obj) || obj[key] == null) {
      return false;
    }
  }
  return true;
}

module.exports = {
  isPhoneNumberUnique,
  isLevelValid,
  isPlaceAccessValid,
  isAgeValid,
  isObjectKeysDefined
}