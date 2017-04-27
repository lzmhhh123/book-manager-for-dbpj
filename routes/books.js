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
  Books.findOne({isbn, status: 0}, (err, book) => {
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
  let {number, isbn} = req.body
  Books.findOne({isbn}, (err, book) => {
    if(err) {
      return res.status(500).send({error: 1, message: 'Sever Error.'})
    }
    if(!book) {
      return res.status(401).send({error: 1, message: 'Not that book.'})
    }
    if(!number || number > book.number) {
      return res.status(401).send({error: 1, message: 'Invalid number.'})
    }
    let newbill = new Bill({isbn, name: book.name, income: book.number*book.price, date: new Date()})
    newbill.save(err => {
      if(err) {
        res.status(500).send({error: 1, message: 'Sever Error.'})
      }
    })
    book.number -= number
    book.save(err => {
      if(err) {
        res.status(500).send({error: 1, message: 'Sever Error.'})
      }
    })
    return res.send({error: 0})
  })
})

router.post('/cancelbook', (req, res) => {
  let {isbn} = req.body
  Books.findOne({isbn, status: 0}, (err, book) => {
    if(err) {
      return res.status(500).send({error: 1, message: 'Sever Error.'})
    }
    if(!book) {
      return res.status(401).send({error: 1, message: 'Not that book.'})
    }
    book.remove((err, result) => {
      if(!book) {
        return res.status(401).send({error: 1, message: 'Not that book.'})
      }
    })
    return res.send({error: 0})
  })
})

router.post('/paybook', (req, res) => {
  let {isbn} = req.body
  Books.findOne({isbn, status: 0}, (err, book) => {
    if(err) {
      return res.status(500).send({error: 1, message: 'Sever Error.'})
    }
    if(!book) {
      return res.status(401).send({error: 1, message: 'Not that book.'})
    }
    let newbill = new Bill({isbn, name: book.name, income: -book.number*book.price, date: new Date()})
    newbill.save(err => {
      if(err) {
        res.status(500).send({error: 1, message: 'Sever Error.'})
      }
    })
    book.status = 1
    book.save(err => {
      if(err) {
        res.status(500).send({error: 1, message: 'Sever Error.'})
      }
    })
    return res.send({error: 0})
  })
})

module.exports = router
