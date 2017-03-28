'use strict'
const config = require('config')
const idamClient = require('../app/idam/idamClient')

class JwtValidator {
  static verify (jwt) {
    return idamClient.details(jwt);
  }
}

module.exports = JwtValidator
