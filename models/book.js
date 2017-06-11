'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// var deepPopulate = require('mongoose-deep-populate')(mongoose)

const bookSchema = new Schema({
  ISBN: String,
  authors: Array,
  title: {
    type: String,
    validate: {
      validator: title => title.length > 2,
      message: 'Title must have more than 2 characters'
    },
    required: [true, 'A book must have a title']
  },
  genre: Array,
  description: String,
  copies: [{
    type: Schema.Types.ObjectId,
    ref: 'copy'
  }],
  price: Number,
  imgSrc: String
}, { versionKey: false })

const Book = mongoose.model('book', bookSchema)
module.exports = Book
