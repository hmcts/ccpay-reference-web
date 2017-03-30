'use strict'
const authTokenStore = require('./authTokenStore')
const IdamClient = require('../../app/idam/idamClient')
const idamClient = new IdamClient()

class UserDetailsHolder {
  constructor (request, response) {
    this.request = request
    this.response = response
  }

  retrieve () {
    let tokenStore = authTokenStore(this.request, this.response)

    return tokenStore
      .retrieve()
      .then(token => {
        if (!token) {
          return null
        } else {
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
                return tokenStore.clear().then(() => null)
              }
              throw err
            })
        }
      })
  }
}

module.exports = function (request, response) {
  return new UserDetailsHolder(request, response)
}
