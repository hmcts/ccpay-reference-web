const express = require('express')
const AppealStoreClient = require('../app/appealStore/appealStoreClient')
const Form = require('../lib/forms/form')
const FormFactory = require('../lib/forms/formFactory')
const userDetailsHolder = require('../lib/auth/userDetailsHolder')

const router = express.Router()
const appealSchema = require('../lib/forms/appealSchema')
const appealStoreClient = new AppealStoreClient()

router.get('/appeal/start', (req, res) => {
  res.render('appeal/start', {form: Form.empty()})
})

router.post('/appeal/start', (req, res, next) => {
  const form = FormFactory.make(req.body, appealSchema)

  if (!form.hasErrors()) { // TODO: migrate to promise
    userDetailsHolder(req)
      .retrieve()
      .then((userDetails) => appealStoreClient.create(userDetails, form.model))
      .then(() => res.redirect(`/appeals`))
      .catch(next)
  } else {
    res.render('appeal/start', {form: form})
  }
})

module.exports = router
