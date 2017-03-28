'use strict'
const isUnprotectedPath = require('./routeHelper').isUnprotectedPath
const JwtExtractor = require('../../lib/jsonWebTokenExtractor')
const JwtValidator = require('../../lib/jsonWebTokenValidator')
const config = require('config')

const sessionCookieName = config.get('session.cookieName')

module.exports = function (req, res, next) {
  const jwt = JwtExtractor.extract(req)
  const isUnprotected = isUnprotectedPath(req.path)

  if (!jwt) {
    if (isUnprotected) {
      return next()
    } else {
      return res.redirect('/login')
    }
  } else {
    JwtValidator
      .verify(jwt)
      // TODO: is refresh required
      .then(() => {
        res.locals.isLoggedIn = true
        return next()
      })
      .catch((err) => {
        if (err.name === 'TokenInvalidError') {
          if (isUnprotected) { // don't redirect to login page if not a restricted page
            res.clearCookie(sessionCookieName)
            return next()
          } else {
            return res.redirect('/login')
          }
        }
        return next(err)
      })
  }
}
