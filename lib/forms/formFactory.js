'use strict'

const Joi = require('joi')
const Form = require('../forms/form')

class FormFactory {

  /**
   * Creates a new {Form}
   * @param data - data to validate and create a Form with
   * @param schema - Joi schema used for validation
   */
  static make (data, schema) {
    const { error, value } = Joi.validate(data, schema, { abortEarly: false, presence: 'required' })
    return new Form(value, error === null ? [] : error.details)
  }
}

module.exports = FormFactory
