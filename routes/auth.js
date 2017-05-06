const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { User } = require('../db')

router.post('/islogin', (req, res) => {
  console.log(req.session.user)
  return res.send({user: req.session.user})
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if(!username || !password) {
    return res.status(401).send({ error: 1, message: 'Username and password cannot be empty.' })
  }
  User.findOne({ username }, (err, user) => {
    if(err) {
      return res.status(500).send({ error: 1, message: 'Server Error.'})
    }
    if(!user) {
      return res.status(401).send({ error:1, message: 'Incorrect username or password.'})
    }
    user.checkPassword(password, (error, user) => {
      if(error) {
        return res.status(401).send({ error:1, message: 'Incorrect username or password.'})
      }
      req.session.user = user
      return res.send({ error: 0, message: 'Login successfully.'})
    })
  })
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  return res.send({ error: 0, message: 'Logout successfully.'})
})

module.exports = router
