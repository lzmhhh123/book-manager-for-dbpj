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

  User.findOne({ _id: user._id }, (err, user) => {
    if (err || !user) {
      return res.status(500).send({ error: 1, message: 'Server error.' })
    }
    user.checkPassword(oldPassword, (err, user) => {
      if (err) {
        return res.status(401).send({ error: 1, message: 'Incorrect password.' })
      }
      if (user.status !== 0) {
        // not activated
        return res.status(401).send({ error: 1, message: 'Please check your email and activate your account.' })
      }
      if (username) {
        User.findOne({ username } , (err, user) => {
          if(err) {
            return res.status(500).send({ error: 1, memssage: 'Server error.'})
          }
          if(user) {
            return res.status(401).send({ error: 1, memssage: 'New username is not unique.'})
          }
        })
        user.name = username
      }
      if (password) {
        user.pwd = md5(password + PWD_SALT)
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
