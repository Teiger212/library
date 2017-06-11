/* eslint-env mocha */
const assert = require('assert')
const Book = require('../models/book')

describe('Reading books out of the DB', () => {

  beforeEach(done => {
    jungle = new Book({ title: 'Jungle Book' })
    jungle.save()
      .then(() => done())
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('finds all the books with a title of "Jungle Book"', done => {
    Book.find({ title: 'Jungle Book' })
      .then(books => {
        assert(books[0]._id.toString() === jungle._id.toString())
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('finds a book with a title of "Jungle Book"', done => {
    Book.findOne({ _id: jungle._id })
      .then(book => {
        assert(book.title === 'Jungle Book')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
