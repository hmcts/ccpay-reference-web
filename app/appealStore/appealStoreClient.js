'use strict'

const request = require('../../lib/request')
const appealStoreUrl = require('config').get('appeal-store.host')

function bearer(token) {
  return 'Bearer ' + token
}

function userId(token) {
  return '3';
}

class AppealStoreClient {
  create(jwt, newAppeal) {
    return request.post({
      uri: `${appealStoreUrl}/users/${userId(jwt)}/appeals`,
      form: newAppeal,
      headers: {
        'Authorization': bearer(jwt)
      }
    })
  }

  retrieve(jwt, id) {
    return request.get({
      uri: `${appealStoreUrl}/users/${userId(jwt)}/appeals/${id}`,
      headers: {
        'Authorization': bearer(jwt)
      }
    })
  }

  retrieveList(jwt) {
    return request.get({
      uri: `${appealStoreUrl}/users/${userId(jwt)}/appeals`,
      headers: {
        'Authorization': bearer(jwt)
      }
    })
  }
}

module.exports = AppealStoreClient;
