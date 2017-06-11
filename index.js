'use strict'

const express = require('express')
const parser = require('body-parser')
const router = require('./api')
const cookieParser = require('cookie-parser')
const path = require('path')
const favicon = require('serve-favicon')
const app = express()
const port = 3000

app.use(favicon(path.join(__dirname, '/public/pics/favicon.ico')))

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', router)
require('./database')
require('./seed')

app.use(express.static('public'))

app.listen(port, function () {
  console.log(`The server is running on port ${port}`)
})
