const { isValueDefined } = require("./validator");

const addLocalPath = (path) => {
  return 'http://localhost:8080' + path;
}

module.exports = { addLocalPath };
