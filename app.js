'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const logging = require('nodejs-logging')

const basicAuth = require('./lib/basicAuth')
const AccessLogger = require('./lib/logging/accessLogger')
const ErrorLogger = require('./lib/logging/errorLogger')

const routes = require('./routes/')

let app = express()

logging.config({
  microservice: 'citizen-frontend',
  team: 'cmc',
  environment: process.env.NODE_ENV
})

let env = process.env.NODE_ENV || 'development'
app.locals.ENV = env

if (env !== 'development') {
  const username = process.env.USERNAME
  const password = process.env.PASSWORD
  app.use(basicAuth(username, password))
}

app.set('view engine', 'njk')
const nunjucksEnv = nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})

const appAssetPaths = {
  'js': '/js',
  'js_vendor': '/js/lib',
  'style': '/stylesheets',
  'style_vendor': '/stylesheets/lib',
  'images_vendor': '/img/lib'
}
nunjucksEnv.addGlobal('asset_paths', appAssetPaths)
nunjucksEnv.addGlobal('serviceName', 'Reference application')
nunjucksEnv.addGlobal('development', env === 'development')
nunjucksEnv.addFilter('date', dateFilter)

app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all('/*', require('./app/idam/routeAuthorisation'))
app.use('/', routes)

// Below will match all routes not covered by the router, which effectively translates to a 404 response
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

// error handlers
const errorLogger = new ErrorLogger()
app.use((err, req, res, next) => {
  errorLogger.log(err)
  let view = env === 'development' ? 'error_dev' : 'error'
  res.status(err.statusCode || 500)
  res.render(view, {
    error: err,
    title: 'error'
  })
  next()
})

const accessLogger = new AccessLogger()
app.use((req, res, next) => {
  res.on('finish', () => accessLogger.log(req, res))
  next()
})

module.exports = app
