'use strict'

const envs = process.env
const Log = require('./log')

module.exports = function (options) {
  const seneca = this

  seneca.add('role:log, cmd:add, type:external', Log)

  return {
    name: envs.TFK_SENECA_LOG_EXTERNAL_TAG || 'tfk-seneca-log-external'
  }
}
