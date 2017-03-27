'use strict'
/* global describe, it */

const expect = require('chai').expect

const isUnprotectedPath = require('../../app/idam/routeHelper').isUnprotectedPath

describe('Checking that path is unprotected', () => {
  it('should return true for index page', (done) => {
    expect(isUnprotectedPath('/')).to.equal(true)
    done()
  })
  it('should return true for login page', (done) => {
    expect(isUnprotectedPath('/login')).to.equal(true)
    done()
  })
  it('should return true for registration page', (done) => {
    expect(isUnprotectedPath('/register')).to.equal(true)
    done()
  })
  it('should return true for registration confirmation page', (done) => {
    expect(isUnprotectedPath('/register-confirmation')).to.equal(true)
    done()
  })
  it('should return true for activation page', (done) => {
    expect(isUnprotectedPath('/activate/123/123')).to.equal(true)
    done()
  })
  it('should return true for account confirmation page', (done) => {
    expect(isUnprotectedPath('/account-confirmation')).to.equal(true)
    done()
  })
  it('should return false for any other page', (done) => {
    expect(isUnprotectedPath('/sdfsdfs')).to.equal(false)
    done()
  })
})

