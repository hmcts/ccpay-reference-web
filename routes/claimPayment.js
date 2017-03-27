'use strict'

const express = require('express')
const router = express.Router()
const PaymentsClient = require('../app/payments/paymentsClient')

router.get('/claim/payment', (req, res, next) => {
  const paymentID = req.cookies['payment-id']

  if (!paymentID) {
    throw new Error('Payment ID does not exist in cookie')
  }

  PaymentsClient.retrieve(paymentID)
    .then((payment) => {
      res.clearCookie('payment-id')
      .render('claim/payment', {
        status: payment.state.status,
        reference: payment.reference
      })
    })
    .catch(next)
})

module.exports = router
