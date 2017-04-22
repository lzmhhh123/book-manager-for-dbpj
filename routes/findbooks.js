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

module.exports = router
