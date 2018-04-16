'use strict'

const express = require('express')
const userCtrl = require('../controllers/userController')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/user/signup', userCtrl.signUp)
api.post('/user/signin', userCtrl.signIn)
api.get('/user/:id', userCtrl.getUser)
api.get('/user', userCtrl.getUsers)

module.exports = api
