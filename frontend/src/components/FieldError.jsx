import React from 'react'

const FieldError = ({ error }) => {
  return (
    error && <span className="block text-red-600">{error.message}</span>
  )
}

export default FieldError