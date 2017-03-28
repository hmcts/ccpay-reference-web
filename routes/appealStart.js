const express = require('express')
const AppealStoreClient = require('../app/appealStore/appealStoreClient')
const Form = require('../lib/forms/form')
const FormFactory = require('../lib/forms/formFactory')
const JwtExtractor = require('../lib/jsonWebTokenExtractor')

const router = express.Router()
const appealStartRoute = '/appeal/start'
const appealSchema = require('../lib/forms/appealSchema')
const appealStoreClient = new AppealStoreClient()

router.get(appealStartRoute, (req, res) => {
  res.render('appeal/start', {form: Form.empty()})
})

router.post(appealStartRoute, (req, res, next) => {
  const form = FormFactory.make(req.body, appealSchema)

  if (!form.hasErrors()) {
    appealStoreClient
      .create(JwtExtractor.extract(req), form.model)
      .then(data => res.redirect(`/appeals`))
      .catch(next)
  } else {
    res.render('appeal/start', {form: form})
  }
})

module.exports = router
