'use strict'
const config = require('config')
const jsonWebToken = require('jsonwebtoken')
const promisify = require('es6-promisify')

const idamClient = require('../app/idam/idamClient')
const verifyJwt = promisify(jsonWebToken.verify)

class JwtValidator {
  static verify (jwt) {
    return idamClient.details(jwt);
  }
}

module.exports = JwtValidator
