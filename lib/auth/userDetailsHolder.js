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
    return new Promise((resolve, reject) => {
      let tokenStore = authTokenStore(this.request, this.response)

      return tokenStore
        .retrieve()
        .then(token => idamClient
          .details(token)
          .then(idamDetails => resolve({
            id: idamDetails.id,
            token: token
          }))
          .catch(err => {
            if (err.name === 'TokenInvalidError') {
              return tokenStore.clear().then(reject)
            }
            reject(err)
          })
        )
        .catch(noToken => reject())
    })
  }
}

module.exports = function (request, response) {
  return new UserDetailsHolder(request, response)
}
