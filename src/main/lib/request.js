'use strict'

const RequestPromiseLoggingHandler = require('../lib/logging/requestPromiseLoggingHandler')
const ApiLogger = require('../lib/logging/apiLogger')
const logger = new ApiLogger()

const requestPromise = require('request-promise-native')
  .defaults({
    json: true
  })

module.exports = new Proxy(requestPromise, new RequestPromiseLoggingHandler(requestPromise, logger))
