const express = require('express')
const router = express.Router()

const md5 = require('spark-md5')

const { User } = require('../db')

router.post('/editprofile', (req, res) => {
  const { user } = req.session
  let { username, password, repeatpassword, oldPassword } = req.body
  if (!oldPassword) {
    return res.status(500).send({ error: 1, message: 'Old password cannot be empty.' })
  }
  if (!username && !password) {
    return res.status(500).send({ error: 1, message: 'Name && password cannot be empty.'})
  }
  if (password != repeatpassword) {
    return res.status(500).send({ error: 1, message: 'Password is not equal to verified password.'})
  }

  User.findOne({ worknumber: user.worknumber }, (err, user) => {
    if (err || !user) {
      return res.status(500).send({ error: 1, message: 'Server error.' })
    }
    user.checkPassword(oldPassword, (err, user) => {
      if (err) {
        return res.status(401).send({ error: 1, message: 'Incorrect password.' })
      }
      if (username) {
        User.findOne({ username } , (err, user) => {
          if(err) {
            return res.status(500).send({ error: 1, message: 'Server error.'})
          }
          if(user) {
            return res.status(401).send({ error: 1, message: 'New username is not unique.'})
          }
        })
        user.username = username
      }
      if (password) {
        user.password = md5.hash(password)
      }
      user.save(err => {
        if (err) {
          return res.status(500).send({ error: 1, message: err.message })
        }
        req.session.user = user
        return res.send({ error: 0, message: 'Message changed successfully.' })
      })
    })
  })
})

module.exports = router
