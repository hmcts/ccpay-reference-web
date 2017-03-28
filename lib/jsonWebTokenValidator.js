'use strict'
const idamClient = require('../app/idam/idamClient')

class JwtValidator {
  static verify (jwt) {
    return idamClient.details(jwt)
  }
}

module.exports = JwtValidator
