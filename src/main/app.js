'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const dateFilter = require('nunjucks-date-filter')
const logging = require('nodejs-logging')

const AccessLogger = require('./lib/logging/accessLogger')
const ErrorLogger = require('./lib/logging/errorLogger')

const routes = require('./routes/')

let app = express()

logging.config({
  microservice: 'reference-web',
  team: 'cc',
  environment: process.env.NODE_ENV
})

let env = process.env.NODE_ENV || 'development'
app.locals.ENV = env

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all('/*', require('./app/idam/routeAuthorizer'))
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
