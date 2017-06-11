'use strict'

const mongoose = require('mongoose')
const borrowersSchema = new mongoose.Schema({
  ID: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book'}]
}, { versionKey: false })

const Borrower = mongoose.model('borrower', borrowersSchema)
module.exports = Borrower
