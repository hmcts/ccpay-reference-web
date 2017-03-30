const request = require('../../lib/request')
const idamHost = require('config').get('idam.host')

class TokenInvalidError extends Error {
  constructor () {
    super('Authorization token is not valid of has expired')
    this.name = 'TokenInvalidError'
  }
}

class CredentialsInvalidError extends Error {
  constructor () {
    super('Credentials are not valid')
    this.name = 'CredentialsInvalidError'
  }
}

function login (emailAddress, password) {
  return request
    .post({
      uri: `${idamHost}/login`,
      headers: {
        'Authorization': 'Basic ' + new Buffer(`${emailAddress}:${password}`).toString('base64')
      },
      resolveWithFullResponse: true
    })
    .then(res => res.body['access-token'])
    .catch(err => {
      if (err.statusCode === 401) {
        throw new CredentialsInvalidError()
      }
      throw err
    })
}

function details (token) {
  return request
    .get({
      uri: `${idamHost}/details`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      resolveWithFullResponse: true
    })
    .then(res => res.body)
    .catch(err => {
      if (err.statusCode === 403) {
        throw new TokenInvalidError()
      }
      throw err
    })
}

module.exports.login = login
module.exports.details = details
