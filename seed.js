'use strict'

const Books = require('./models/book')
const Borrowers = require('./models/borrower')
const Users = require('./models/user')
const Copies = require('./models/copy')

const borrower1 = new Borrowers({
  ID: '201024932',
  name: 'Eyal Teiger',
  address: 'Ramat Gan',
  email: 'eyal@teiger.com'
})
const borrower2 = new Borrowers({
  ID: '563144491',
  name: 'Oren Levy',
  address: 'Hertzliya',
  phone: '052-2242695'
})
const borrower3 = new Borrowers({
  ID: '144953775',
  name: 'Orna Sadan',
  address: 'Hertzliya',
  phone: '055-8842631'
})

const copy1 = new Copies({
  copyId: 'ACC-1',
  isBorrowed: false,
  lastBorrower: null
})

const copy2 = new Copies({
  copyId: 'ACC-2',
  isBorrowed: false,
  lastBorrower: null
})

const copy3 = new Copies({
  copyId: 'ABB-1',
  isBorrowed: false,
  lastBorrower: null
})

const copy4 = new Copies({
  copyId: 'HJJE-1',
  isBorrowed: false,
  lastBorrower: null
})

const book1 = new Books({
  ISBN: 'ABB',
  authors: ['Miguel de Cervantes'],
  title: 'Don Quixote',
  genre: ['Novel'],
  description: 'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.',
  price: 12,
  copies: [copy3],
  imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41d-rugLMRL._SL160_.jpg'
})

const book2 = new Books({
  ISBN: 'ACC',
  authors: ['Dante Alighieri'],
  title: 'The Divine Comedy',
  genre: ['Epic Novel'],
  description: "Belonging in the immortal company of the great works of literature, Dante Alighieri's poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.",
  price: 33,
  copies: [copy1, copy2],
  imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/51zYBhmaIML._SL160_.jpg'
})

const book3 = new Books({
  ISBN: 'RGY',
  authors: ['Muhammad Zahalqa', 'Gabi Mor', 'Ronny Sherer'],
  title: 'The Divine Studies',
  genre: ['Epic Novel'],
  description: 'Belonging in the immortal company of the great works of coding, the 3 wise teachers poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.',
  price: 33,
  copies: [],
  imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/51zYBhmaIML._SL160_.jpg'
})

const book4 = new Books({
  ISBN: 'HJJE',
  authors: ['Howard Pyle'],
  title: 'Robin Hood',
  genre: ['Adventure', 'Children'],
  description: 'He robbed from the rich and gave to the poor, and had escapades enough to please any adventure-loving child. Now even the youngest readers can have the chance to enter Sherwood Forest with Robin\'s band of merry men, and meet such unforgettable characters as Friar Tuck, Little John, Allan-a-Dale, the nasty Sheriff of Nottingham, and wicked King John. Every moment of the story is filled with action and excitement.',
  price: 30,
  copies: [copy4],
  imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/516YD90ZZ2L._SX361_BO1,204,203,200_.jpg'
})

const user1 = new Users({
  email: 'test1@gmail.com',
  password: 'password'
})
const user2 = new Users({
  email: 'test2@gmail.com',
  password: 'password'
})
const user3 = new Users({
  email: 'test3@gmail.com',
  password: 'password'
})

const mockBooks = [book1, book2, book3, book4]
const mockBorrowers = [borrower1, borrower2, borrower3]
const mockUsers = [user1, user2, user3]
const mockCopies = [copy1, copy2, copy3, copy4]

function seedCreate (modelType, mockType) {
  mockType.forEach(function (data, index) {
    modelType.find({}, function (err, mockType) {
      if (!err && !mockType.length) {
        modelType.create(data)
      }
    })
  })
}

seedCreate(Users, mockUsers)
seedCreate(Books, mockBooks)
seedCreate(Borrowers, mockBorrowers)
seedCreate(Copies, mockCopies)
