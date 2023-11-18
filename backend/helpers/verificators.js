const isPassLevelValid = (body) => {
  const { level } = body;
  if (level > 5 || level < 1) {
    return false;
  }
  return true;
}

const isPlaceAccessValid = (body) => {
  const { userAge, placeAge, passLevel, placeLevel } = body;
  if (userAge < placeAge && passLevel < placeLevel) {
    return false;
  }
  return true;
}

module.exports = {
  isPassLevelValid,
  isPlaceAccessValid
}