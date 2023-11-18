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

module.exports = {
  isLevelValid,
  isPlaceAccessValid
}