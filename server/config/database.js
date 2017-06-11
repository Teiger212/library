'use strict'
// const database = 'library'
const mongoose = require('mongoose')


var protocol = 'mongodb'
var url = 'localhost'
var port = 27017
const db = 'Eyals_Library'

function connect() {
  mongoose.Promise = global.Promise
  mongoose.connect(`${protocol}://${url}:${port}/${db}`)
  return mongoose.connection
}

module.exports = {
  connect
}
