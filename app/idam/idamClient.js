const request = require('../../lib/request')
const idamHost = require('config').get('idam.host')
const validateUuid = require('uuid-validate')

class TokenInvalidError extends Error {
  constructor() {
    super('Authorization token is not valid of has expired');
    this.name = 'TokenInvalidError';
  }
}

class CredentialsInvalidError extends Error {
  constructor() {
    super('Credentials are not valid');
    this.name = 'CredentialsInvalidError';
  }
}

function login(emailAddress, password) {
  return request
    .post({
      uri: `${idamHost}/login`,
      headers: {
        'Authorization': 'Basic ' + new Buffer(`${emailAddress}:${password}`).toString('base64')
      },
      resolveWithFullResponse: true
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        throw new CredentialsInvalidError();
      }
      throw err;
    })
}

function details(token) {
  return request
    .get({
      uri: `${idamHost}/details`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      resolveWithFullResponse: true
    })
    .catch((err) => {
      if (err.statusCode === 403) {
        throw new TokenInvalidError();
      }
      throw err;
    })
}

function registerUser(emailAddress, password) {
  return request.post({
    uri: `${idamHost}/users`,
    body: {
      email: emailAddress,
      password: password
    },
    json: true
  })
}

function sendActivationEmail(uuid) {
  return request.get(`${idamHost}/users/${uuid}/activation`)
}

function activateAccount(uuid, activationKey) {
  if (!(validateUuid(uuid) && validateUuid(activationKey))) {
    throw new Error('Invalid activation link')
  }

  return request.put({
    uri: `${idamHost}/users/${uuid}/activation`,
    body: activationKey
  })
}

function refreshToken(userId, jwt) {
  return request.get({
    uri: `${idamHost}/users/${userId}/refresh-token`,
    headers: {
      'Authorization': 'Bearer ' + jwt
    },
    resolveWithFullResponse: true
  })
}

module.exports.login = login
module.exports.details = details
module.exports.refreshToken = refreshToken
module.exports.registerUser = registerUser
module.exports.activateAccount = activateAccount
module.exports.sendActivationEmail = sendActivationEmail
