'use strict'

import loginController from '../controllers/login.controller'
import userValidate from '../models/model.user/user.validate'
import auth from '../auth/auth'

import { errors } from 'celebrate'

export default (app) => {

  app.post('/api/signup', userValidate.signUp.BODY, loginController.SignUp)
  app.post('/api/signin', userValidate.signIn.BODY, loginController.SignIn)

  app.use(errors())

}