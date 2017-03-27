'use strict'

const express = require('express')
const config = require('config')
const healthService = require('../lib/nodeHealthService')

const router = express.Router()

const DEFAULT_PROBE = 'ping'

router.get('/health', healthService.route(
  {
    'idam': {
      url: url('idam'),
      probe: DEFAULT_PROBE
    },
    'claim-store': {
      url: url('claim-store'),
      probe: DEFAULT_PROBE
    },
    'payments': {
      url: url('payments'),
      probe: DEFAULT_PROBE
    },
    'fees': {
      url: url('fees'),
      probe: DEFAULT_PROBE
    },
    'postcodeInfo': {
      url: url('postcodeInfo'),
      token: config.get('postcodeInfo.accessToken'),
      probe: 'pingWithToken'
    }
  }
))

function url (serviceName) {
  return config.get(`${serviceName}.healthCheckUrl`)
}

module.exports = router
