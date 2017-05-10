const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const { User } = require('../db')
const md5 = require('spark-md5')

router.post('/finduser', (req, res) => {
  User.find((err, users) => {
    if(err) {
      return res.status(500).send({ error: 1, message: 'Server Error.'})
    }
    return res.send({ error: 0, users})
  })
})

router.post('/adduser', (req, res) => {
  let {username, password, vpassword, name, birthday, worknumber, gender} = req.body
  console.log({username, password, vpassword, name, birthday, worknumber, gender});
  let s = req.body.status
  if(!username || !password || !birthday || !name || !worknumber || !gender || !s) {
    return res.status(401).send({error: 1, message: 'Invalid Input, anything can\'t be empty.'})
  }
  if(password != vpassword) {
    return res.status(401).send({error: 1, message: 'Verify password is not equal password.'})
  }
  User.findOne({username}, (err, user1) => {
    if(err) {
      return res.status(500).send({ error: 1, message: 'Server Error.'})
    }
    if(user1) {
      return res.status(401).send({ error: 1, message: 'Username is exist.'})
    }
    User.findOne({worknumber}, (err, user) => {
      if(err) {
        return res.status(500).send({ error: 1, message: 'Server Error.'})
      }
      if(user) {
        return res.status(401).send({ error: 1, message: 'Work Number is exist.'})
      }
      let newuser = new User({username, worknumber, password: md5.hash(password), birthday, name, gender, status: s == 'Yes' ? 1 : 0})
      newuser.save(err => {
        if(err) {
          return res.status(500).send({ error: 1, message: 'Server Error.'})
        }
        return res.send({error: 0})
      })
    })
  })
})

module.exports = router
