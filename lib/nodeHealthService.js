'use strict'

const request = require('../lib/request')
const healthService = require('node-health-service').Service

healthService.probe.pingWithToken = function (cfg) {
  return function (callback) {
    const result = this
    request
      .get({
        uri: cfg.url,
        headers: {
          'Authorization': `Token ${cfg.token}`
        },
        json: true
      })
      .then(resp => {
        result.ok = true
        callback()
      })
      .catch(err => {
        result.ok = false
        result.error = err
        callback()
      })
  }
}

module.exports = healthService
