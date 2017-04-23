const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { Books, Bill } = require('../db')

router.post('/findbooks', (req, res) => {
  Books.find((err, books) => {
    if(err) {
      return res.status(500).send({ error: 1, message: 'Server Error.'})
    }
    return res.send({ error: 0, books})
  })
})

router.post('/addbook', (req, res) => {
  let isbn = req.body.isbn
  let number = req.body.number
  let name = req.body.name
  let author = req.body.author
  let publishing_house = req.body.publishing_house
  let price = req.body.price

  if(!isbn || !number || !name || !author || !publishing_house || !price) {
    return res.status(401).send({error: 1, message: 'ISBN & number & name & author & publishing_house & price can\'t be empty.'})
  }
  Books.findOne({isbn}, (err, book) => {
    if(err) {
      return res.status(500).send({error: 1, message: 'Sever Error.'})
    }
    if(book) {
      book.number = book.number + number
      book.save(err => {
        if(err) {
          return res.status(500).send({error: 1, message: 'Sever Error.'})
        }
        return res.send({error: 0})
      })
    }
    let newbook = new Books({isbn, number, name, author, publishing_house, price, status: 0})
    newbook.save(err => {
      if(err) {
        return res.status(500).send({error: 1, message: 'Sever Error.'})
      }
      return res.send({error: 0})
    })
  })
})

router.post('/sellbook', (req, res) => {

})

router.post('/cancelbook', (req, res) => {

})

router.post('/paybook', (req, res) => {

})

module.exports = router
