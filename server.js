#!/usr/bin/env node
const app = require('./app');
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('ssl/localhost.key', 'utf8');
const certificate = fs.readFileSync('ssl/localhost.crt', 'utf8');

const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTP_PORT || 3000);

const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
httpsServer.listen(process.env.HTTPS_PORT || 3443);
