'use strict'
/* global describe, it, beforeEach */

const chai = require('chai')
const expect = chai.expect
const spies = require('chai-spies')

chai.use(spies)

const RequestPromiseLoggingHandler = require('../../main/lib/logging/requestPromiseLoggingHandler')

describe('RequestPromiseLoggingHandler', () => {
  let handler, proxy
  let options

  let requestPromise = {
    get: (options) => { },
    post: (options) => { },
    put: (options) => { },
    del: (options) => { },
    delete: (options) => { },
    patch: (options) => { },
    head: (options) => { },
    another: (options) => { }
  }

  let apiLogger = {
    logRequest: (requestData) => { },
    logResponse: (responseData) => { }
  }

  beforeEach(() => {
    options = { }
    handler = new RequestPromiseLoggingHandler(requestPromise, apiLogger)
    proxy = new Proxy(requestPromise, handler)
  })

  describe('request-promise http calls proxy', () => {
    let logRequestCall

    beforeEach(() => {
      logRequestCall = chai.spy.on(apiLogger, 'logRequest')
    })

    const suiteParameters = [
      { paramName: 'options object', param: { } },
      { paramName: 'uri string', param: 'http://local.instance/some/path' }
    ]

    suiteParameters.forEach((suite) => {
      describe(`when passed an ${suite.paramName}`, () => {
        it('should handle logging on a get call', () => {
          proxy.get(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a put call', () => {
          proxy.put(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a post call', () => {
          proxy.post(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a del call', () => {
          proxy.del(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a delete call', () => {
          proxy.delete(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a patch call', () => {
          proxy.patch(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a head call', () => {
          proxy.head(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should not handle logging on other calls', () => {
          proxy.another(suite.param)
          expect(logRequestCall).not.to.have.been.called()
        })
      })
    })
  })

  describe('handleLogging', () => {
    let originalCallback

    beforeEach(() => {
      originalCallback = chai.spy()
    })

    it('should assign a callback to the options object', () => {
      handler.handleLogging('any', options)
      expect(options.callback).not.to.be.undefined
    })

    it('should override the originally assigned callback', () => {
      options.callback = originalCallback
      handler.handleLogging('any', options)

      expect(options.callback).not.to.equal(originalCallback)
    })

    it('should call the original callback defined in options object', () => {
      options.callback = originalCallback
      handler.handleLogging('any', options)
      options.callback()

      expect(originalCallback).to.have.been.called()
    })
  })
})
