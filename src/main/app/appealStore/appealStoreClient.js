'use strict'

const request = require('../../lib/request')
const appealStoreUrl = require('config').get('appeal-store.host')

class AppealAccessForbiddenError extends Error {
  constructor () {
    super('Access to appeal forbidden')
    this.name = 'AppealAccessForbiddenError'
    this.statusCode = 403
  }
}

const translateOrRethrow = (err) => {
  if (err.statusCode === 403) {
    throw new AppealAccessForbiddenError()
  }
  throw err
}

class AppealStoreClient {
  create (userDetails, newAppeal) {
    return request
      .post({
        uri: `${appealStoreUrl}/users/${userDetails.id}/appeals`,
        form: newAppeal,
        headers: {
          'Authorization': userDetails.token
        }
      })
      .catch(translateOrRethrow)
  }

  retrieve (userDetails, id) {
    return request
      .get({
        uri: `${appealStoreUrl}/users/${userDetails.id}/appeals/${id}`,
        headers: {
          'Authorization': userDetails.token
        }
      })
      .catch(translateOrRethrow)
  }

  retrieveList (userDetails) {
    return request
      .get({
        uri: `${appealStoreUrl}/users/${userDetails.id}/appeals`,
        headers: {
          'Authorization': userDetails.token
        }
      })
      .catch(translateOrRethrow)
  }
}

module.exports = AppealStoreClient
