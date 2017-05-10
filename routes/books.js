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
    else {
      let newbook = new Books({isbn, number, name, author, publishing_house, price, status: 0})
      newbook.save(err => {
        if(err) {
          return res.status(500).send({error: 1, message: 'Sever Error.'})
        }
        return res.send({error: 0})
      })
    }
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
    let newbill = new Bill({isbn, name: book.name, income: number*book.price, date: new Date()})
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
    Books.findOne({isbn: book.isbn, status: 1}, (err, book1) => {
      if(err) {
        res.status(500).send({error: 1, message: 'Sever Error.'})
      }
      if(!book1) {
        book.save(err => {
          if(err) {
            res.status(500).send({error: 1, message: 'Sever Error.'})
          }
        })
      }
      else {
        book1.number += book.number
        book1.save(err => {
          if(err) {
            res.status(500).send({err: 1, message: 'Sever Error'})
          }
        })
        book.remove((err, res) => {
          if(err) {
            res.status(500).send({err: 1, message: 'Sever Error'})
          }
        })
      }
    })
    return res.send({error: 0})
  })
})

router.post('/editBook', (req, res) => {
  let {isbn, name, author, publishing_house, price} = req.body
  if(!isbn) {
    return res.status(401).send({error: 1, message: 'ISBN can\'t be empty.'})
  }
  if(!name && !author && !publishing_house && !price) {
    return res.status(401).send({eror: 1, message: 'Name & Author & Publishing house & Price can not be empty.'})
  }
  Books.findOne({isbn}, (err, book) => {
    if(err) {
      return res.status(500).send({error: 1, message: 'Sever Error.'})
    }
    if(!book) {
      return res.status(401).send({error: 1, message: 'Not that book.'})
    }
    if(name) book.name = name
    if(author) book.author = author
    if(publishing_house) book.publishing_house = publishing_house
    if(price) book.price = price
    book.save(err => {
      if(err) {
        res.status(500).send({error: 1, message: 'Sever Error.'})
      }
    })
    return res.send({error: 0})
  })
})

module.exports = router
