const express = require('express')
const router = express.Router()
const idamClient = require('../app/idam/idamClient')

const confirmationRoute = '/account-confirmation'

router.get('/activate/:userUuid/:activationKey', (req, res, next) => {
  idamClient.activateAccount(req.params.userUuid, req.params.activationKey)
    .then(() => res.redirect(confirmationRoute))
    .catch(next)
})

router.get(confirmationRoute, (req, res) => {
  res.render('activation/account-confirmation')
})

module.exports = router
