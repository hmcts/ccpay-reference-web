const Joi = require('joi')

const appealSchema = Joi.object({
  description: Joi.string().label('Description'),
  type: Joi.valid('HAPPY_PATH', 'WITH_UNCAUGHT_PAYMENT_REDIRECT').label('Type of appeal')
})

module.exports = appealSchema
