'use strict'
const isUnprotectedPath = require('./routeHelper').isUnprotectedPath
const idamClient = require('./idamClient')
const JwtExtractor = require('../../lib/jsonWebTokenExtractor')
const JwtValidator = require('../../lib/jsonWebTokenValidator')
const config = require('config')
const moment = require('moment')

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
        res.locals.isLoggedIn = true;
        return next()
      })
      .catch((err) => {
        return next(err)
      })
  }
};

function needToRefresh (decodedJwt) {
  const secondsLeft = decodedJwt.exp - moment().unix()
  return secondsLeft < config.get('idam.secondsBeforeRefresh')
}
