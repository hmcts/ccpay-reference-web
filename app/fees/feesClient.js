'use strict'

const request = require('../../lib/request')
const config = require('config')
const feesUrl = config.get('fees.host')
const feeCode = config.get('fees.code')
const moment = require('moment')

function todaysDate () {
  return moment().format('YYYY-MM-DD')
}

class FeesClient {

  /**
   * Calculates the fee a claimant should pay
   *
   * @param claimValue the amount claiming for
   * @returns {Promise.<TResult>|*} promise containing the fee amount in pounds
   */
  static calculate (claimValue) {
    return request.get({
      uri: `${feesUrl}/calculate/?fee_code=${feeCode}&date=${todaysDate()}&value=${claimValue}`,
      timeout: 1500
    }).then((body) => body.amount)
  }
}

module.exports = FeesClient
