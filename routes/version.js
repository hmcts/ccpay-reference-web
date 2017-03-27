const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

router.get('/version', (req, res) => {
  res.send(fs.readFileSync(path.join(__dirname, '..', 'version'), 'utf-8'))
})

module.exports = router
