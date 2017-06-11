'use strict'
/* eslint-env mocha */
const mongoose = require('mongoose')
const Book = require('../models/book')
const Copy = require('../models/copy')
const Borrower = require('../models/borrower')

describe('Associations', () => {
  let jungle, copy, dana
  beforeEach(done => {
    jungle = new Book({ title: 'Jungle Book' })
    copy = new Copy({ copyId: 'AB-12' })
    dana = new Borrower({ name: 'Dana' })
    jungle.copies.push(copy)
    copy.lastBorrower = dana
    Promise.all([jungle.save(), copy.save(), dana.save()])
      .then(() => done())
  })
  it('Saves a relation between a book, its copies & last borrower', done => {
    Book.findOne({ title: 'Jungle Book' })
      .populate('copies')
      .then(book => {
        console.log(book)
        done()
      })
  })
})
