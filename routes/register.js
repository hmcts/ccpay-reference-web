const express = require('express')
const router = express.Router()
const idamClient = require('../app/idam/idamClient')

const registrationRoute = '/register'
const confirmationRoute = '/register-confirmation'

router.get(registrationRoute, (req, res) => {
  res.render('registration/register')
})

router.post(registrationRoute, (req, res, next) => {
  idamClient.registerUser(req.body.email, req.body.password)
    .then(idamUser => idamClient.sendActivationEmail(idamUser.uuid))
    .then(() => res.redirect(confirmationRoute))
    .catch(next)
})

router.get(confirmationRoute, (req, res) => {
  res.render('registration/register-confirmation')
})

module.exports = router
