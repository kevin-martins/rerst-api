const addLocalPath = (path) => {
  return 'http://localhost:8080' + path;
}

const normalisePhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/\s/g, '').replace(/^\+33/, '0');
}

module.exports = {
  addLocalPath,
  normalisePhoneNumber,
};
