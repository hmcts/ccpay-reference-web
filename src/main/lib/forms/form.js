'use strict'

class Form {
  /**
   * @param model - a json object used to fill the form
   * @param errors - an array of error objects containing `path` and `message` fields
   */
  constructor (model, errors) {
    this.model = model
    if (errors) {
      this.errors = errors.map(e => {
        return {
          message: e.message,
          path: e.path,
          fieldName: Form.asFieldName(e.path)
        }
      })
    } else {
      this.errors = errors
    }
  }

  static empty () {
    return new Form(null, [])
  }

  hasErrors () {
    return this.errors.length > 0
  }

  errorFor (fieldName) {
    return this.errors
      .filter(e => e.fieldName === fieldName)
      .map(e => e.message)[0]
  }

  valueFor (fieldName) {
    if (!this.model) {
      return undefined
    } else {
      let value = this.model
      Form.asPath(fieldName).split('.').forEach(n => {
        value = value[n]
      })

      return value
    }
  }

  /**
   * Converts HTML form field in `foo[bar]` format to path in `foo.bar` format.
   */
  static asPath (fieldName) {
    return fieldName.replace(/\[/g, '.').replace(/]/g, '')
  }

  /**
   * Converts path in `foo.bar` format to HTML form field name in `foo[bar]` format.
   */
  static asFieldName (path) {
    const parts = path.split('.')
    return parts[0] + parts.slice(1).map(elem => `[${elem}]`).join('')
  }
}

module.exports = Form
