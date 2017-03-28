const express = require('express')
const router = express.Router()
const idamClient = require('../app/idam/idamClient')
const config = require('config')

const loginRoute = '/login'

const sessionCookie = config.get('session.cookieName')

router.get(loginRoute, (req, res) => {
  res.render('login')
});

router.post(loginRoute, (req, res, next) => {
  idamClient
    .login(req.body.email, req.body.password)
    .then((idamRes) => {
      res.cookie(sessionCookie, idamRes.body['access-token']);
      res.redirect('/appeals');
    })
    .catch((err) => {
      if (err.name === 'CredentialsInvalidError') {
        return res.render('login')
      }
      return next(err);
    });
});

router.get('/logout', (req, res, next) => {
  res.clearCookie(sessionCookie)
  res.redirect('/')
});

module.exports = router
