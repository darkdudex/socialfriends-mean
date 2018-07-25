'use strict'

import { Joi, celebrate } from 'celebrate'

import forgetPassword from '../model.user/validate/user.forgetpassword.validate'
import signIn from '../model.user/validate/user.signin.validate'
import signUp from '../model.user/validate/user.signup.validate'

const { params } = {
  params: Joi.object({
    id: Joi.string().alphanum().required()
  }).unknown()
}

export default {
  forgetPassword,
  signIn,
  signUp,
  user: {
    PARAMS: celebrate({ params })
  }
}