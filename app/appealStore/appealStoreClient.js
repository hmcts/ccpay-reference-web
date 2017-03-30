'use strict'

const request = require('../../lib/request')
const appealStoreUrl = require('config').get('appeal-store.host')

class AppealStoreClient {
  create (userDetails, newAppeal) {
    return request.post({
      uri: `${appealStoreUrl}/users/${userDetails.id}/appeals`,
      form: newAppeal,
      headers: {
        'Authorization': userDetails.token
      }
    })
  }

  retrieve (userDetails, id) {
    return request.get({
      uri: `${appealStoreUrl}/users/${userDetails.id}/appeals/${id}`,
      headers: {
        'Authorization': userDetails.token
      }
    })
  }

  retrieveList (userDetails) {
    return request.get({
      uri: `${appealStoreUrl}/users/${userDetails.id}/appeals`,
      headers: {
        'Authorization': userDetails.token
      }
    })
  }
}

module.exports = AppealStoreClient
