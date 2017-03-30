'use strict'
/* global describe, it */
const authTokenStore = require('../../lib/auth/authTokenStore')
const config = require('config')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const withTokenCookie = (value) => {
  let cookies = {}
  cookies[config.get('session.cookieName')] = value
  return cookies
}

describe('AuthTokenStore', () => {
  it('should retrieve token from cookie', (done) => {
    const req = {
      cookies: withTokenCookie('token')
    }

    authTokenStore(req).retrieve()
      .should.eventually.equal('token')
      .notify(done)
  })

  it('should return undefined if no cookie', (done) => {
    const req = {
      cookies: {}
    }

    authTokenStore(req).retrieve()
      .should.eventually.equal(undefined)
      .notify(done)
  })

  it('should save token to cookie', (done) => {
    const res = {
      cookies: {},

      cookie: function (key, value) {
        this.cookies[key] = value;
      }
    }

    authTokenStore(null, res)
      .save('newValue')
      .then(() => {
        return res.cookies[config.get('session.cookieName')]
      })
      .should.eventually.equal('newValue')
      .notify(done)
  })
})
