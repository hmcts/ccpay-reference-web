'use strict'
const isUnprotectedPath = require('./routeHelper').isUnprotectedPath
const userDetailsHolder = require('../../lib/auth/userDetailsHolder')

module.exports = function (req, res, next) {
  userDetailsHolder(req, res)
    .retrieve()
    .then(userDetails => {
      res.locals.isLoggedIn = userDetails !== null

      if (userDetails || isUnprotectedPath(req.path)) {
        next()
      } else {
        return res.redirect('/login')
      }
    })
}
