'use strict'
/* global describe, it, beforeEach */

const expect = require('chai').expect

const ApiLogger = require('../../main/lib/logging/apiLogger')

describe('ApiLogger', () => {
  let apiLogger

  beforeEach(() => {
    apiLogger = new ApiLogger({})
  })

  describe('_buildRequestEntry', () => {
    let requestData

    beforeEach(() => {
      requestData = {
        method: 'GET',
        uri: 'http://localhost/resource'
      }
    })

    it('should format the message of method and uri', () => {
      let logEntry = apiLogger._buildRequestEntry(requestData)
      expect(logEntry.message)
        .to.contain('GET')
        .and.to.contain('http://localhost/resource')
    })

    it('should include request body if provided', () => {
      requestData.requestBody = { formField: 'formValue' }
      let logEntry = apiLogger._buildRequestEntry(requestData)
      expect(logEntry.message).to.contain('{"formField":"formValue"}')
    })

    it('should not include request body if not provided', () => {
      let logEntry = apiLogger._buildRequestEntry(requestData)
      expect(logEntry.message).not.to.contain('Body')
    })

    it('should include query string if provided', () => {
      requestData.query = { key: 'value' }
      let logEntry = apiLogger._buildRequestEntry(requestData)
      expect(logEntry.message).to.contain('{"key":"value"}')
    })

    it('should not include query string if not provided', () => {
      let logEntry = apiLogger._buildRequestEntry(requestData)
      expect(logEntry.message).not.to.contain('Query')
    })

    it('should include both request body and query string if provided', () => {
      requestData.requestBody = { formField: 'formValue' }
      requestData.query = { key: 'value' }
      let logEntry = apiLogger._buildRequestEntry(requestData)
      expect(logEntry.message)
        .to.contain('{"formField":"formValue"}')
        .and.to.contain('{"key":"value"}')
    })
  })

  describe('_buildResponseEntry', () => {
    let responseData

    beforeEach(() => {
      responseData = {
        uri: 'http://localhost/resource',
        responseCode: 200
      }
    })

    it('should format the message of uri', () => {
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.message).to.contain('http://localhost/resource')
    })

    it('should set the responseCode', () => {
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.responseCode).to.equal(200)
    })

    it('should include response body if provided', () => {
      responseData.responseBody = { field: 'value' }
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.message).to.contain('{"field":"value"}')
    })

    it('should not include response body if not provided', () => {
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.message).not.to.contain('Body')
    })

    it('should include error if provided', () => {
      responseData.error = { message: 'Something bad happened' }
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.message).to.contain('{"message":"Something bad happened"}')
    })

    it('should not include error if not provided', () => {
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.message).not.to.contain('Error')
    })

    it('should include both response body and error if provided', () => {
      responseData.responseBody = { field: 'value' }
      responseData.error = { message: 'Something bad happened' }
      let logEntry = apiLogger._buildResponseEntry(responseData)
      expect(logEntry.message)
        .to.contain('{"field":"value"}')
        .and.to.contain('{"message":"Something bad happened"}')
    })
  })
})
