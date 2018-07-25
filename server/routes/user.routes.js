'use strict'

import userController from '../controllers/user.controller'
import userValidate from '../models/model.user/user.validate'

import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.get('/api/user', auth.isAuth, userController.GetUsers)
  app.get('/api/user/:id', auth.isAuth, userValidate.user.PARAMS, userController.GetUserById)

  app.use(errors())

}