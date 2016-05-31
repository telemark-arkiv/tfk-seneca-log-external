'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Logger = require('./lib/logger')
const envs = process.env

const options = {
  seneca: {
    tag: envs.TFK_SENECA_LOG_EXTERNAL_TAG || 'tfk-seneca-log-external'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:log, cmd:add, type:external', model: 'consume'}
    ]
  },
  logger: {
    url: envs.TFK_SENECA_LOG_EXTERNAL_URL || 'https://logexternal.no'
  },
  isolated: {
    host: envs.TFK_SENECA_LOG_EXTERNAL_HOST || 'localhost',
    port: envs.TFK_SENECA_LOG_EXTERNAL_PORT || 8000
  }
}

var Service = Seneca(options.seneca)

if (envs.TFK_SENECA_LOG_EXTERNAL_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Logger, options.logger)
