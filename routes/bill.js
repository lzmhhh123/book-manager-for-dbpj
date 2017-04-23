const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { Bill } = require('../db')

router.post('/findbill', (req, res) => {
  Bill.find((err, bill) => {
    if(err) {
      return res.status(500).send({ error: 1, message: 'Server Error.'})
    }
    return res.send({ error: 0, bill})
  })
})

module.exports = router
