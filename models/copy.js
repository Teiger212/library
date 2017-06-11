'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const copySchema = new Schema({
  copyId: {
    type: String,
    validate: {
      validator: copyId => copyId.length > 2,
      message: 'Copyid must be longer than 2 characters'
    },
    required: [true, 'Must have copyId.']
  },
  isBorrowed: {
    type: Boolean,
    default: false
    // required: [true, 'Must have availability status.']
  },
  lastBorrower: {type: Schema.Types.ObjectId, ref: 'borrower'},
  borrowedDate: {type: Date, default: null}
})

const Copy = mongoose.model('copy', copySchema)
module.exports = Copy

