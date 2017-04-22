const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { User } = require('../db')

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if(!username || !password) {
    res.status(401).send({ error: 1, message: 'Username and password cannot be empty.' })
  }
  User.findOne({ username }, (err, res) => {
    if(err) {
      res.status(500).send({ error: 1, message: 'Server Error.'})
    }
    if(!user) {
      res.status(401).send({ error:1, message: 'Incorrect username or password.'})
    }
    user.checkPassword(password, (error, user) => {
      if(error) {
        res.status(401).send({ error:1, message: 'Incorrect username or password.'})
      }
      req.session.user = user
      return res.send({ error: 0, memssage: 'Login successfully.', user})
    })
  })
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  return res.send({ error: 0, memssage: 'Logout successfully.'})
})

module.exports = router
