const express = require('express')
const router = express.Router()
const idamClient = require('../app/idam/idamClient')
const authTokenStore = require('../lib/auth/authTokenStore')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  idamClient
    .login(req.body.email, req.body.password)
    .then(token => authTokenStore(req, res).save(token))
    .then(token => res.redirect('/appeals'))
    .catch(err => {
      if (err.name === 'CredentialsInvalidError') {
        return res.render('login')
      }
      return next(err)
    })
})

router.get('/logout', (req, res) => {
  authTokenStore(req, res)
    .clear()
    .then(() => res.redirect('/'))
})

module.exports = router
