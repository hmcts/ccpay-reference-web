'use strict'

const moment = require('moment')
const shortid = require('shortid')

class PaymentReferenceGenerator {
  static generate () {
    const currentDate = moment()

    const year = currentDate.format('YYYY')
    const month = currentDate.format('MM')
    const day = currentDate.format('DD')
    const referenceNumber = shortid()

    return `CMC/${referenceNumber}/${day}/${month}/${year}`
  }
}

module.exports = PaymentReferenceGenerator
