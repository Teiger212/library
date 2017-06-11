/* eslint-env mocha */
const assert = require('assert')
const Book = require('../models/book')

describe('Creating records', () => {
  it('saves a book', done => {
    const jungle = new Book({title: 'Jungle book'})

    jungle.save()
      .then(() => {
        assert(!jungle.isNew)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
