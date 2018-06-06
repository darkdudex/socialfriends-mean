'use strict'

const express = require('express')
const controllers = require('../controllers/controller')
const auth = require('../middlewares/auth')
const api = express.Router()

const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage()
});

//#region API RUNNING 
api.get('/', (req,res) => {
  res.status(200).send('<style>*{ font-family: Arial; font-size: 50px; text-decoration: underline; color: #4c0094; text-align: center; margin-top: 30px}</style><h1>API RUNNING</h1>')
})
//#endregion

//#region Files
api.post('/fileupload', multer.array('files', 100), controllers.fileController.AddFile)
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
api.post('/comment', controllers.commentController.AddComment)
// api.put('/comment', controllers.commentController.Updatecomment)
// api.delete('/comment', controllers.commentController.Removecomment)
api.get('/comment/:publicationId', controllers.commentController.GetcommentByPublicationId)
//#endregion

//#region Like Endpoints 
api.post('/like', controllers.likeController.AddLike)
api.delete('/like', controllers.likeController.RemoveLike)
api.get('/like/:publicationId', controllers.likeController.GetLikeByPublicationId)
//#endregion

//#region Follower Endpoints 
api.post('/follower', controllers.followerController.AddFollower)
api.get('/follower/:userId', controllers.followerController.GetFollowerByUserId)
api.delete('/follower', controllers.followerController.RemoveFollower)
//#endregion

module.exports = api
