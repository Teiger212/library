/* eslint-env mocha */
const assert = require('assert')
const Book = require('../models/book')

describe('Updating records', () => {
  let jungle

  beforeEach(done => {
    jungle = new Book({ title: 'Jungle Book', price: 10 })
    jungle.save()
      .then(() => done())
      .catch(err => {
        console.log(err)
        done()
      })
  })
  function assertName (operation, done) {
    operation
      .then(() => Book.find({}))
      .then(books => {
        assert(books.length === 1)
        assert(books[0].title === 'Desert Book')
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  }
  it('instance type using set & save', done => {
    jungle.set('title', 'Desert Book')
    assertName(jungle.save(), done)
  })
  it('A model instance can update', done => {
    assertName(jungle.update({ title: 'Desert Book' }), done)
  })
  it('A model class can update', done => {
    assertName(Book.update({ title: 'Jungle Book' }, { title: 'Desert Book' }), done)
  })
  it('A model class can update one record', done => {
    assertName(Book.findOneAndUpdate({ title: 'Jungle Book' }, { title: 'Desert Book' }), done)
  })
  it('A model class can find a record with an Id and update', done => {
    assertName(
      Book.findByIdAndUpdate(jungle._id, { title: 'Desert Book' }), done
    )
  })
  it('A book can have their price incremented by 1 ', done => {
    Book.update({ title: 'Jungle Book' }, { $inc: { price: 1 } })
      .then(() => Book.findOne({ title: 'Jungle Book' }))
      .then(book => {
        assert(book.price === 11)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
