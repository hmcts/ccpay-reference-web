'use strict'
/* global describe, it */

const expect = require('chai').expect
const Form = require('../../main/lib/forms/form')

describe('Form', () => {
  describe('#asPath', () => {
    it('should not change simple form name', () => {
      expect(Form.asPath('text')).to.equal('text')
    })

    it('should convert nested form name to path', () => {
      expect(Form.asPath('aaa[bbb][ccc]')).to.equal('aaa.bbb.ccc')
    })
  })

  describe('#asFieldName', () => {
    it('should not change simple path without nesting', () => {
      expect(Form.asFieldName('text')).to.equal('text')
    })

    it('should convert nested form name to path', () => {
      expect(Form.asFieldName('aaa.bbb.ccc')).to.equal('aaa[bbb][ccc]')
    })
  })

  describe('#valueFor', () => {
    const form = new Form({a: {b: 'c'}})

    it('should return a value from model for given form field', () => {
      expect(form.valueFor('a[b]')).to.equal('c')
    })

    it('should return undefined if model does not contain given field', () => {
      expect(form.valueFor('gibberish')).to.equal(undefined)
    })
  })

  describe('#errorFor', () => {
    const form = new Form({}, [{ message: 'error message', path: 'a.b' }])

    it('should return an error message for given form field', () => {
      expect(form.errorFor('a[b]')).to.equal('error message')
    })

    it('should return an undefined if error for given field is does not exist', () => {
      expect(form.errorFor('gibberish')).to.equal(undefined)
    })
  })
})
