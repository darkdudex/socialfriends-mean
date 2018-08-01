'use strict'

import { Joi, celebrate } from 'celebrate'

const { body, params, query, headers } = {
  body: Joi.object().keys({
    message: Joi.string().required(),
    userId: Joi.string().required(),
    filePublication: Joi.array().required(),
    creationDate: Joi.date(),
    comment: Joi.string(),
    like: Joi.string(),
    totalComment: Joi.number(),
  }),
  params: Joi.object({
    userId: Joi.string().alphanum().required()
  }).unknown(),
  query: {

  },
  headers: Joi.object({

  }).unknown()
}

export default {
  BODY: celebrate({ body }),
  PARAMS: celebrate({ params }),
  BODY_AND_PARAMS: celebrate({ body, params })
}