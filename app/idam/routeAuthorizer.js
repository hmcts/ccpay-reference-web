'use strict'
const isUnprotectedPath = require('./routeHelper').isUnprotectedPath
const userDetailsHolder = require('../../lib/auth/userDetailsHolder')

module.exports = function (req, res, next) {
  return userDetailsHolder(req, res)
    .retrieve()
    .then(userDetails => {
      res.locals.isLoggedIn = true
      next()
    })
    .catch(noUserDetails => isUnprotectedPath(req.path) ? next() : res.redirect('/login'))
}
