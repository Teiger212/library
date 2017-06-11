'use strict'

const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
  email: String,
  password: String
}, { versionKey: false })

const User = mongoose.model('User', usersSchema)
module.exports = User

