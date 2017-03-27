'use strict'
/* global describe, it */

const expect = require('chai').expect
const moment = require('moment')

const PaymentReferenceGenerator = require('../../app/payments/paymentReferenceGenerator')

describe('Generate payment reference', () => {
  it('should return correct reference', (done) => {
    const paymentReference = PaymentReferenceGenerator.generate()
    const format = /^CMC\/.*\/[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/

    expect(format.test(paymentReference)).to.equal(true)

    const paymentReferenceSplit = paymentReference.split('/')

    const currentDate = moment()
    expect(paymentReferenceSplit[2]).to.equal(currentDate.format('DD'))
    expect(paymentReferenceSplit[3]).to.equal(currentDate.format('MM'))
    expect(paymentReferenceSplit[4]).to.equal(currentDate.format('YYYY'))
    done()
  })
})
