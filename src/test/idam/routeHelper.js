'use strict'
/* global describe, it */

const expect = require('chai').expect

const isUnprotectedPath = require('../../main/app/idam/routeHelper').isUnprotectedPath

describe('Checking that path is unprotected', () => {
  it('should return true for index page', (done) => {
    expect(isUnprotectedPath('/')).to.equal(true)
    done()
  })
  it('should return true for login page', (done) => {
    expect(isUnprotectedPath('/login')).to.equal(true)
    done()
  })
  it('should return false for any other page', (done) => {
    expect(isUnprotectedPath('/sdfsdfs')).to.equal(false)
    done()
  })
})
