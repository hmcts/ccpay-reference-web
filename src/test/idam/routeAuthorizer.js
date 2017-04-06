'use strict'
/* global describe, it, beforeEach */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiSpies = require('chai-spies')
const mock = require('mock-require')

chai.use(chaiAsPromised)
chai.use(chaiSpies)
chai.should()

mock('../../main/lib/auth/userDetailsHolder', (req, res) => {
  return {
    retrieve: () => new Promise((resolve, reject) => {
      req.authenticated ? resolve() : reject()
    })
  }
})

mock('../../main/app/idam/routeHelper', {
  isUnprotectedPath: (path) => path === '/unprotected'
})

const routeAuthorizer = require('../../main/app/idam/routeAuthorizer')

describe('RouteAuthorizer', () => {
  var req, res, next

  beforeEach(function () {
    next = chai.spy()
    req = {}
    res = {redirect: chai.spy(), locals: {}}
  })

  it('should redirect anonymous user to login when protected resource is accessed', (done) => {
    req.path = '/protected'
    req.authenticated = false

    routeAuthorizer(req, res, next).should.be.fulfilled.notify(() => {
      res.redirect.should.have.been.called.with('/login')
      next.should.not.have.been.called()
      done()
    })
  })

  it('should allow anonymous user to unprotected resource', (done) => {
    req.path = '/unprotected'
    req.authenticated = false

    routeAuthorizer(req, res, next).should.be.fulfilled.notify(() => {
      res.redirect.should.not.have.been.called()
      next.should.have.been.called()
      done()
    })
  })

  it('should allow authenticated user to protected resource', (done) => {
    req.path = '/protected'
    req.authenticated = true

    routeAuthorizer(req, res, next).should.be.fulfilled.notify(() => {
      res.locals.isLoggedIn.should.equal(true)
      res.redirect.should.not.have.been.called()
      next.should.have.been.called()
      done()
    })
  })
})

mock.stopAll()
