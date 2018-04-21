'use strict'

const express = require('express')
const controllers = require('../controllers/controller')
const auth = require('../middlewares/auth')
const api = express.Router()

// #region API RUNNING 
api.get('/', (req,res) => {
  res.status(200).send('<style>*{ font-family: Arial; font-size: 50px; text-decoration: underline; color: #4c0094; text-align: center; margin-top: 30px}</style><h1>API RUNNING</h1>')
})
//#endregion

//#region Login and Register Enpoints 
api.post('/signup', controllers.userController.SignUp)
api.post('/signin', controllers.userController.SignIn)
//#endregion

//#region User Endpoints 
api.get('/user', controllers.userController.GetUsers)
api.get('/user/:id', controllers.userController.GetUserById)
//#endregion

//#region Publication Endpoints 
api.post('/publication', controllers.publicationController.AddPublication)
api.put('/publication', controllers.publicationController.UpdatePublication)
api.delete('/publication', controllers.publicationController.RemovePublication)
api.get('/publication/:userId', controllers.publicationController.GetPublicationByUserId)
//#endregion

//#region Comment Endpoints 
api.post('/comment', controllers.publicationController.AddPublication)
api.put('/comment', controllers.publicationController.UpdatePublication)
api.delete('/comment', controllers.publicationController.RemovePublication)
api.get('/comment/:publicationId', controllers.publicationController.GetPublicationByUserId)
//#endregion

//#region Like Endpoints 
api.post('/like', controllers.publicationController.AddPublication)
api.delete('/like', controllers.publicationController.RemovePublication)
api.get('/like/:publicationId', controllers.publicationController.GetPublicationByUserId)
//#endregion

//#region Follower Endpoints 
api.post('/follower', controllers.publicationController.AddPublication)
api.delete('/follower', controllers.publicationController.RemovePublication)
api.get('/follower/:userId', controllers.publicationController.GetPublicationByUserId)
api.get('/following/:userId', controllers.publicationController.GetPublicationByUserId)
//#endregion

module.exports = api
