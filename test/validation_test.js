/* eslint-env mocha */
const assert = require('assert')
const Book = require('../models/book')

describe('Validating records', () => {
  it('Requires a book title', () => {
    const book = new Book({title: undefined})
    const validationResult = book.validateSync()
    const {message} = validationResult.errors.title
    assert(message === 'A book must have a title')
  })
  it('Requires a book title to be at least 3 characters', () => {
    const book = new Book({title: 'Da'})
    const validationResult = book.validateSync()
    const {message} = validationResult.errors.title
    assert(message === 'Title must have more than 2 characters')
  })
  it('Dissallows invalid records from being saved', done => {
    const book = new Book({title: 'Da'})
    book.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors.title
        assert(message === 'Title must have more than 2 characters')
        done()
      })
  })
})
