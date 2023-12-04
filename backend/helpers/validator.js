const isPlaceAccessValid = (userAge, placeAge, passLevel, placeLevel) => {
  if (userAge < placeAge || passLevel < placeLevel) {
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
  isPlaceAccessValid,
  isObjectKeysDefined
}