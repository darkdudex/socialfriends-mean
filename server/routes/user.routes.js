'use strict'

import userController from '../controllers/user.controller'
import userValidate from '../models/model.user/user.validate'

import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.get('/api/user', auth.isAuth, userController.GetUsers)
  app.put('/api/user/:id', auth.isAuth, userController.UpdateUser)
  app.put('/api/user/password/:id', auth.isAuth, userController.UpdateUsersOnlyPassword)
  app.get('/api/user/:id', auth.isAuth, userValidate.user.PARAMS, userController.GetUserById)

  app.use(errors())

}