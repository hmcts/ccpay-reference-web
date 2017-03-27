'use strict'

const express = require('express');
const router = express.Router();
const JwtExtractor = require('../lib/jsonWebTokenExtractor');
const AppealStoreClient = require('../app/appealStore/appealStoreClient');

const appealStoreClient = new AppealStoreClient()

router.get('/appeals/:id', (req, res, next) => {
  appealStoreClient
    .retrieve(JwtExtractor.extract(req), req.params.id)
    .then(data => res.render('appeal/view', {appeal: data}))
    .catch(next)
});

router.get('/appeals', (req, res, next) => {
  appealStoreClient
    .retrieveList(JwtExtractor.extract(req))
    .then(data => res.render('appeal/list', {appeals: data}))
    .catch(next)
});

module.exports = router;
