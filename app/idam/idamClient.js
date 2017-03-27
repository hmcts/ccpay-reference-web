const request = require('../../lib/request')
const idamHost = require('config').get('idam.host')
const validateUuid = require('uuid-validate')

function login(emailAddress, password) {
  return request.post({
    uri: `${idamHost}/login`,
    headers: {
      'Authorization': 'Basic ' + new Buffer(`${emailAddress}:${password}`).toString('base64')
    },
    resolveWithFullResponse: true
  })
}

function details(token) {
  return request.get({
    uri: `${idamHost}/details`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    resolveWithFullResponse: true
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
