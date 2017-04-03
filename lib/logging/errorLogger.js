'use strict'

class ErrorLogger {
  constructor (logger = require('nodejs-logging').getLogger('errorLogger.js')) {
    this.logger = logger
  }

  log (err) {
    if (err) {
      this.logger.error(`${err.stack || err}`)
    } else {
      this.logger.debug('Received error was blank')
    }
  }
}

module.exports = ErrorLogger
