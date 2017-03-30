'use strict'
/* global describe, it */

const expect = require('chai').expect
const config = require('config')

const authTokenStore = require('../../lib/auth/authTokenStore')

const jwtValue = 'a'

const dummyCookie = () => {
  let cookies = {}
  cookies[config.get('session.cookieName')] = jwtValue
  return cookies
}

describe('Extracting JWT', () => {
  it('should return jwt from cookie', (done) => {
    const req = {
      cookies: dummyCookie()
    }

    authTokenStore(req)
      .retrieve()
      .then(token => {
        expect(token).to.equal(jwtValue)
        done()
      })
  })

  it('should return undefined if no cookie', (done) => {
    const req = {
      cookies: {}
    }

    authTokenStore(req)
      .retrieve()
      .then(token => {
        expect(token).to.equal(undefined)
        done()
      })
  })
})
