'use strict'
const config = require('config')
const sessionCookieName = config.get('session.cookieName')

class AuthTokenStore {
  constructor (request, response) {
    this.request = request
    this.response = response
  }

  retrieve () {
    return new Promise(resolve => {
      let token = (this.request && this.request.cookies) ? this.request.cookies[sessionCookieName] : null
      resolve(token)
    })
  }

  save (token) {
    return new Promise(resolve => {
      this.response.cookie(sessionCookieName, token)
      resolve(token)
    })
  }

  clear () {
    return new Promise(resolve => {
      this.response.clearCookie(sessionCookieName)
      resolve()
    })
  }
}

module.exports = function (request, response) {
  return new AuthTokenStore(request, response)
}
