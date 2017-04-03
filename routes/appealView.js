'use strict'

const express = require('express')
const router = express.Router()
const userDetailsHolder = require('../lib/auth/userDetailsHolder')
const AppealStoreClient = require('../app/appealStore/appealStoreClient')

const appealStoreClient = new AppealStoreClient()

router.get('/appeals', (req, res, next) => {
  userDetailsHolder(req)
    .retrieve()
    .then(userDetails => appealStoreClient.retrieveList(userDetails))
    .then(data => res.render('appeal/list', {appeals: data}))
    .catch(next)
})

router.get('/appeals/:id', (req, res, next) => {
  userDetailsHolder(req)
    .retrieve()
    .then(userDetails => appealStoreClient.retrieve(userDetails, req.params.id))
    .then(data => res.render('appeal/view', {appeal: data}))
    .catch(next)
})

module.exports = router
