/* eslint-env mocha */
const assert = require('assert')
const Book = require('../models/book')

describe('Deleting a user', () => {
  let jungle
  beforeEach(done => {
    jungle = new Book({ title: 'Jungle Book' })
    jungle.save()
      .then(() => done())
      .catch(err => {
        console.log(err)
        done()
      })
  })
  const titleQuery = { title: 'Jungle Book' }
  it('model instance remove', done => {
    jungle.remove()
      .then(() => Book.findOne(titleQuery))
      .then(book => {
        assert(book === null)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('class method remove', done => {
    Book.remove()
      .then(() => Book.findOne(titleQuery))
      .then(book => {
        assert(book === null)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('class method findOneAndRemove', done => {
    Book.findOneAndRemove(titleQuery)
      .then(() => Book.findOne(titleQuery))
      .then(book => {
        assert(book === null)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
  it('class method findByIdRemove', done => {
    Book.findByIdAndRemove(jungle._id)
      .then(() => Book.findOne(titleQuery))
      .then(book => {
        assert(book === null)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
