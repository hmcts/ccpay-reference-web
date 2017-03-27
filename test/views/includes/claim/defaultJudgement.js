'use strict'
/* global describe, it */

const expect = require('chai').expect
const nunjucks = require('nunjucks')
const path = require('path')

nunjucks.configure(path.join(__dirname, '../../../../views'))

describe('defaultJudgment include', () => {
  function renderWith (context) {
    return nunjucks.render('includes/claim/defaultJudgement.njk', context).trim()
  }

  it('should render "Request default judgment" button if default judgment is available', () => {
    let html = renderWith({ defaultJudgementAvailable: true })
    expect(html).to.contain('defaultJudgementButton')
  })

  it('should render nothing if default judgment is not available', () => {
    let html = renderWith({ defaultJudgementAvailable: false })
    expect(html).to.be.empty
  })

  it('should not render the button when default judgement has already been requested', () => {
    let html = renderWith({ defaultJudgementAvailable: true, defaultJudgementAlreadyRequested: true })
    expect(html).not.to.contain('defaultJudgementButton')
  })

  it('should tell the user that he requested default judgement if he did', () => {
    let html = renderWith({ defaultJudgementAvailable: true, defaultJudgementAlreadyRequested: true })
    expect(html).to.contain('defaultJudgementRequestedNotification')
  })

  it('should render the button when default judgement has not been requested yet', () => {
    let html = renderWith({ defaultJudgementAvailable: true, defaultJudgementAlreadyRequested: false })
    expect(html).to.contain('defaultJudgementButton')
  })

  it('should not tell the user he requested default judgement when default has not been requested yet', () => {
    let html = renderWith({ defaultJudgementAvailable: true, defaultJudgementAlreadyRequested: false })
    expect(html).not.to.contain('defaultJudgementRequestedNotification')
  })

  it('should render nothing if empty context is passed', () => {
    let html = renderWith({ })
    expect(html).to.be.empty
  })
})
