const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { Books } = require('../db')

router.post('/findbooks', (req, res) => {
  Books.find((err, books) => {
    if(err) {
      res.status(500).send({ error: 1, errorMessage: 'Server Error.'})
    }
    return res.send({ error: 0, books})
  })
})

router.post('/addBook', (req, res) => {
  let isbn = req.body.isbn
  let number = req.body.number
  let name = req.body.name
  let author = req.body.author
  let publishing_house = req.body.publishing_house
  if(!isbn || !number || !name || !author || !publishing_house) {
    res.status(401).send({error: 1, memssage: 'ISBN & number & name & author & publishing_house can\'t be empty.'})
  }
  Books.findOne({isbn}, (err, book) => {
    if(err) {
      res.status(500).send({error: 1, memssage: 'Sever Error.'})
    }
    if(book) {
      res.status(401).send({error: 1, memssage: 'The ISBN is exist.'})
    }
    let newbook = new Books({isbn, number, name, author, publishing_house})
    newbook.save(err => {
      if(err) {
        res.status(500).send({error: 1, memssage: 'Sever Error.'})
      }
      return res.send({error: 0})
    })
  })
})

module.exports = router
