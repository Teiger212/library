'use strict'
// const database = 'library'
const mongoose = require('mongoose')


var protocol = 'mongodb'
var url = 'localhost'
var port = 27017
const db = 'Eyals_Library'

mongoose.Promise = global.Promise
mongoose.connect(`${protocol}://${url}:${port}/${db}`, function (err) { 
  if (err) {
    console.log('problems with mongo')
  } else {
    console.log('Yay, mongo is running')
  }
})

