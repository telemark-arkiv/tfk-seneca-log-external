'use strict'

module.exports = function generateToken (options) {
  const jwt = require('jsonwebtoken')

  if (!options) {
    throw new Error('Missing required input: options object')
  }

  if (!options.key) {
    throw new Error('Missing required input: options.key')
  }

  if (!options.payload) {
    throw new Error('Missing required input: options.payload')
  }

  return jwt.sign(options.payload, options.key)
}
