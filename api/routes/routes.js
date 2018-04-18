'use strict'

const express = require('express')
const userCtrl = require('../controllers/userController')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/user/signup', userCtrl.SignUp)
api.post('/user/signin', userCtrl.SignIn)
api.get('/user/:id', userCtrl.GetUser)
api.get('/user', userCtrl.GetUsers)

module.exports = api
