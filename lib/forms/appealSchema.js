const Joi = require('joi')

const appealSchema = Joi.object({
  description: Joi.string().label('Description'),
  type: Joi.valid('SOME_TYPE', 'SOME_OTHER_TYPE').label('Type of appeal')
});

module.exports = appealSchema
