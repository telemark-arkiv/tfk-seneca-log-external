'use strict'

const envs = process.env
const Wreck = require('wreck')
const pkg = require('../package.json')
const generateToken = require('./generate-token')
const jwtSecret = envs.TFK_SENECA_LOG_EXTERNAL_JWT_KEY || 'Louie Louie, oh no, I got to go'
const apiUrl = envs.TFK_SENECA_LOG_EXTERNAL_API_URL || 'https://logservice.api.com/api'
const token = generateToken({key: jwtSecret, payload: {system: pkg.name}})


module.exports = function logExternal (args, callback) {
  const payload = args.data
  const options = {
    json: true,
    headers: {
      Authorization: token
    },
    payload: payload
  }

  Wreck.post(apiUrl, options, function handleResponse (error, response, payload) {
    if (error) {
      callback(error, null)
    } else {
      callback(null, payload)
    }
  })
}
