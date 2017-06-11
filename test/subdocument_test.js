// /* eslint-env mocha */
// const assert = require('assert')
// const Book = require('../models/book')

// describe('Subdocuments', () => {
//   it('Can create a subdocument', done => {
//     const jungle = new Book({
//       title: 'Jungle Book',
//       copies: [{ copyId: 'A1' }]
//     })
//     jungle.save()
//       .then(() => Book.findOne({ title: 'Jungle Book' }))
//       .then(book => {
//         assert(book.copies[0].copyId === 'A1')
//         done()
//       })
//   })
//   it('Can add subdocuments to an existing record', done => {
//     const jungle = new Book({
//       title: 'Jungle Book',
//       copies: []
//     })
//     jungle.save()
//       .then(() => Book.findOne({ title: 'Jungle Book' }))
//       .then(book => {
//         book.copies.push({ copyId: 'A1' })
//         return book.save()
//       })
//       .then(() => Book.findOne({ title: 'Jungle Book' }))
//       .then(book => {
//         assert(book.copies[0].copyId === 'A1')
//         done()
//       })
//   })
//   it('Can remove an existing document', done => {
//     const jungle = new Book({
//       title: 'Jungle Book',
//       copies: [{ copyId: 'B2' }]
//     })
//     jungle.save()
//       .then(Book.findOne({ title: 'Jungle Book' }))
//       .then(book => {
//         const copyId = book.copies[0]
//         copyId.remove()
//         return book.save()
//       })
//       .then(Book.findOne({ title: 'Jungle Book' }))
//       .then(book => {
//         assert(book.copies.length === 0)
//         done()
//       })
//   })
// })
