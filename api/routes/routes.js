'use strict'

const express = require('express')
const userCtrl = require('../controllers/userController')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/user/signup', userCtrl.signUp)
api.post('/user/signin', userCtrl.signIn)

module.exports = api
