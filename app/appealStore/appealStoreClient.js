'use strict'

const request = require('../../lib/request')
const claimStoreUrl = require('config').get('claim-store.host')
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

  getClaimantOptions(refNumber) {
    return request.get({
      uri: `${claimStoreUrl}/claims/${refNumber}/options/claimant`
    })
  }

  getDefendantOptions(refNumber) {
    return request.get({
      uri: `${claimStoreUrl}/claims/${refNumber}/options/defendant`
    })
  }

  assignDefendant(refNumber, params, jwt) {
    return request.post({
      uri: `${claimStoreUrl}/claims/${refNumber}/assign-defendant`,
      body: params,
      headers: {
        'Authorization': bearer(jwt)
      }
    })
  }

  defend(refNumber) {
    return request.post({
      uri: `${claimStoreUrl}/claims/${refNumber}/defend`
    })
  }

  requestDefaultJudgement(refNumber) {
    return request.post({
      uri: `${claimStoreUrl}/claims/${refNumber}/default-judgement`
    })
  }
}

module.exports = AppealStoreClient;
