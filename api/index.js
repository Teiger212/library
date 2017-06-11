'use strict'

const express = require('express')
const router = express.Router()
const Books = require('../models/book')
const Borrowers = require('../models/borrower')
const Copies = require('../models/copy')
const Users = require('../models/user')

router.post('/login', function (req, res) {
  var user = req.body.user

  Users.findOne({
    $and: [
      { email: user.email },
      { password: user.password }
    ]
  })
    .then(user => {
      if (user !== null) {
        res.json({message: 'YAY'})
      } else {
        res.json({message: 'POOP'})
      }
    })
    .catch(err => {
      return res.status(500).json({ message: err })
    })
})

router.get('/books/:title', function (req, res) {
  let searchText = req.params.title
  Books.find({
    $or: [
      { title: new RegExp(searchText, 'i') }, {
        ISBN: new RegExp(searchText, 'i')
      },
      { authors: { $elemMatch: { $in: [new RegExp(searchText, 'i')] } } },
      { copies: { $elemMatch: { 'copyId': searchText } } }
    ]
  })
    .populate({
      path: 'copies',
      model: 'copy',
      populate: {
        path: 'lastBorrower',
        model: 'borrower'
      }
    })
    .then(books => {
      res.json({ books: books })
    })
})

router.post('/books', function (req, res) {
  const book = req.body.book
  Copies.insertMany(book.copies)
    .then(result => {
      book.copies = result
      Books.insertMany(book)
        .then(createdBook => {
          res.json({createdBook})
        })
    })
})

router.put('/books', function (req, res) {
  let book = req.body.copy
  Books.update({ _id: book._id }, book, function (err, book) {
    if (err) {
      return res.status(500).json({ err: err.message })
    }
    res.send({ message: 'Book updated' })
  })
})

router.put('/books/:id', function (req, res) {
  let id = req.params.id
  let book = req.body
  if (book && book._id !== id) {
    return res.status(500).json({ err: 'could not update' })
  }
  Books.findByIdAndUpdate(id, book, function (err, book) {
    if (err) {
      return res.status(500).json({ err: err.message })
    }
    res.send({ message: 'Book updated' })
  })
})

router.delete('/books/:id', function (req, res) {
  let id = req.params.id
  let book = req.body
  if (book && book._id !== id) {
    return res.status(500).json({ err: 'could not delete' })
  }
  Books.findByIdAndRemove(id, book, function (err, book) {
    if (err) {
      return res.status(500).json({ err: err.message })
    }
    res.send({ message: 'Book removed!' })
  })
})

// router.post('/books', function (req, res) {
//   var book = req.body.book
//   Books.create(book, function (err, book) {
//     if (err) {
//       return res.status(500).json({ err: err.message })
//     }
//     res.send({ message: 'Book created' })
//   })
// })

router.get('/bookcopy/:copyId', function (req, res) {
  let id = req.params.copyId

  Copies.findOne({ 'copyId': id })
    .then(copy => {
      let copyId = copy._id
      Books.findOne({ 'copies': copyId })
        .populate({
          path: 'copies',
          populate: {
            path: 'lastBorrower',
            model: 'borrower'
          }
        })
        .then(book => {
          console.log(book)
        })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ message: err })
    })
})

router.post('/borrowCopy', function (req, res) {
  let copy = req.body.data.copyId
  let pId = req.body.data.id
  Borrowers.findOne({ ID: pId })
    .then(borrower => {
      if (borrower && borrower !== null && borrower.borrowedBooks.length <= 5) {
        Copies.findOne({ 'copyId': copy })
          .then(borrowedCopy => {
            borrowedCopy.isBorrowed = true
            borrowedCopy.lastBorrower = borrower
            borrowedCopy.borrowedDate = Date.now()
            borrower.borrowedBooks.push(borrowedCopy)
            Promise.all([borrower.save(), borrowedCopy.save()]).then(() => {
              res.json({ borrowedCopy, borrower })
            })
          })
      } else {
        res.json({message: 'Invalid ID'})
      }
    })
    .catch(err => {
      return res.status(500).json({ err: err })
    })
})

router.post('/returnCopy', function (req, res) {
  let copy = req.body.copy
  const borrowerId = copy.lastBorrower.ID
  const copyId = copy._id

  Borrowers.findOne({ ID: borrowerId })
    .then(borrower => {
      borrower.borrowedBooks.remove(copyId)
      borrower.save().then(() => {
        Copies.findOne({ _id: copyId }).then(copy => {
          copy.isBorrowed = false
          copy.save().then(() => {
            res.json({ message: 'success' })
          })
        })
      })
    })
})

router.post('/removeCopy', function (req, res) {
  let copy = req.body.data.copy
  let book = req.body.data.book
  Books.findOne({title: book.title})
    .then(book => {
      book.copies.remove(copy._id)
      book.save()
        .then(() => {
          Copies.findOneAndRemove({copyId: copy.copyId})
            .then(() => {
              res.json({book})
            })
        })
    })
})

// router.get('/lateBooks', function (req, res) {
//   Books.find({
//     $and: [
//       { 'copies': { $elemMatch: { 'status': 'borrowed' } } },
//       {
//         'copies.borrowedDate': { $gt: new Date() + 30 }
//       }]
//   },
//     function (err, books) {
//       if (err) {
//         return res.status(500).json({ message: err.message })
//       }
//       res.json({ books: books })
//     })
// })

// router.get('/getBorrowedBooks', function (req, res) {
//   Books.find({ 'copies': { $elemMatch: { 'isBorrowed': true } } }, function (err, books) {
//     if (err) {
//       return res.status(500).json({ message: err.message })
//     }
//     res.json({ books: books })
//   })
// })

// router.get('/activeBorrowers', function (req, res) {
//   Borrowers.find({}, function (err, borrowers) {
//     if (err) {
//       return res.status(500).json({ message: err.message })
//     }
//     res.json({ borrowers: borrowers })
//   })
// })

router.get('/borrowers/:query', function (req, res) {
  let query = req.params.query
  Borrowers.find({
    $or: [
      { name: new RegExp(query, 'i') },
      { ID: new RegExp(query, 'i') },
      { phone: new RegExp(query, 'i') },
      { email: new RegExp(query, 'i') }
    ]
  })
    .populate({
      path: 'borrowedBooks',
      model: 'copy'
    })
    .then(borrowers => {
      // console.log(borrowers)
      res.json({ borrowers })
    })
    .catch(err =>  res.status(500).json({ message: err.message }))
})



router.post('/borrowers', function (req, res) {
  var borrower = req.body.data
  Borrowers.create(borrower, function (err, book) {
    if (err) {
      return res.status(500).json({ err: err.message })
    }
    res.send({ message: 'borrower created' })
  })
})




module.exports = router
