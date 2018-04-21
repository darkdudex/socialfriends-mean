'use strict'

const express = require('express')
const controllers = require('../controllers/controller')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/signup', controllers.userController.SignUp)
api.post('/signin', controllers.userController.SignIn)
api.get('/user/:id', controllers.userController.GetUser)
api.get('/user', controllers.userController.GetUsers)

module.exports = api
