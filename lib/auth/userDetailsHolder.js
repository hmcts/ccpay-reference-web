'use strict'
const authTokenStore = require('./authTokenStore')
const idamClient = require('../../app/idam/idamClient')

class UserDetailsHolder {
  constructor (request, response) {
    this.request = request
    this.response = response
  }

  retrieve () {
    let tokenStore = authTokenStore(this.request)

    return tokenStore
      .retrieve()
      .then(token => {
        if (!token) {
          return null
        }

        return idamClient
          .details(token)
          .then(idamDetails => {
            return {
              id: idamDetails.id,
              token: token
            }
          })
          .catch(err => {
            if (err.name === 'TokenInvalidError') {
              tokenStore.clear()
              return null
            }
            throw err
          })
      })
  }
}

module.exports = function (request, response) {
  return new UserDetailsHolder(request, response)
}
