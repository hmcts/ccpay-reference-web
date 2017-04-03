'use strict'

const UNPROTECTED_ROUTES = [
  /\/login/
]

module.exports.isUnprotectedPath = (path) => {
  return path === '/' ||
    UNPROTECTED_ROUTES
      .some((route) => route.test(path))
}
