'use strict'
/* global describe, it */

const expect = require('chai').expect
const config = require('config')

const JwtExtractor = require('../../lib/jsonWebTokenExtractor')

const jwtValue = 'a'

const dummyCookie = () => {
  let cookies = {}
  cookies[ config.get('session.cookieName') ] = jwtValue
  return cookies
}

describe('Extracting JWT', () => {
  it('should return jwt from cookie', (done) => {
    const req = {
      cookies: dummyCookie()
    }

    expect(JwtExtractor.extract(req)).to.equal(jwtValue)
    done()
  })

  it('should return undefined if no cookie', (done) => {
    const req = {
      cookies: {}
    }
    expect(JwtExtractor.extract(req)).to.equal(undefined)
    done()
  })
})
