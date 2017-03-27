'use strict'

const UNPROTECTED_ROUTES = [
  /\/login/,
  /\/register(-confirmation)?/,
  /\/activate\/.*\/.*/,
  /\/account-confirmation/,
  /\/health/,
  /\/version/
]

module.exports.isUnprotectedPath = (path) => {
  return path === '/' ||
    UNPROTECTED_ROUTES
      .some((route) => route.test(path))
}

