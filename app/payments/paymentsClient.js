'use strict'

const request = require('../../lib/request')
const config = require('config')

const PaymentReferenceGenerator = require('./paymentReferenceGenerator')

const paymentsHost = config.get('payments.host')

function createPaymentRequest (fee, paymentReference, returnURL) {
  const amountInPennies = fee * 100

  return {
    amount: amountInPennies,
    reference: paymentReference,
    description: 'Civil money claim',
    return_url: returnURL,
    email: 'this_field_is_not_used_but_is_required@example.com'
  }
}

class PaymentsClient {
  static create (amount, returnURL) {
    const paymentReference = PaymentReferenceGenerator.generate()

    return request.post({
      uri: `${paymentsHost}/payments`,
      body: createPaymentRequest(amount, paymentReference, returnURL),
      headers: {
        service_id: 'cmc'
      }
    })
  }

  static retrieve (id) {
    return request.get({
      uri: `${paymentsHost}/payments/${id}`,
      headers: {
        service_id: 'cmc'
      }
    })
  }
}

module.exports = PaymentsClient
