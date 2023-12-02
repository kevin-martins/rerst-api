const schemaValidationError = (err) => {
  for (const field in err.errors) {
    const { kind, message } = err.errors[field];
    switch(kind) {
      case 'required':
        return {
          status: 400,
          message: `Error: the ${field} field is missing`
        }
      case 'min':
        return {
          status: 401,
          message
        }
      case 'max':
        return {
          status: 401,
          message
        }
      case 'regexp':
        return {
          status: 401,
          message: `Error: the ${field} format is invalid`
        }
    }
  }
  return { status: null, message: null }
}

module.exports = { schemaValidationError }