/* eslint-env mocha */
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
before(done => {
  mongoose.connect('mongodb://localhost/library_test')
  mongoose.connection
    .once('open', () => { done() })
    .on('error', err => console.warn('Warining', err))
})

beforeEach(done => {
  const {books, copies, borrowers} = mongoose.connection.collections
  books.drop(() => {
    copies.drop(() => {
      borrowers.drop(() => {
        done()
      })
    })
  })
})
