'use strict'
const config = require('config')

class JwtExtractor {
  static extract (req) {
    let token = null
    if (req && req.cookies) {
      token = req.cookies[ config.get('session.cookieName') ]
    }
    return token
  }
}

module.exports = JwtExtractor
