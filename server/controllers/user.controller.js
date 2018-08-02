'use strict'

import userModel from '../models/model.user/user.model'
import service from '../auth/jwt'
import utilities from '../utilities/utilities'

const EncryptPassword = (req) => {
  const _EncryptPassword = utilities.EncodePassword(req.body.password)
  req.body.password = _EncryptPassword
}

export default {

  GetUsers: async (req, res) => {

    let page = req.query.page
    const limit = 6

    if (page >= 1)
      page = page - 1
    else
      page = 0

    try {

      const users = await userModel.find().select(['-password']).limit(limit).skip(page * limit)
      const total = await userModel.find().count()
      return res.status(200).send({ users, total })

    } catch (error) {

      return res.status(500).send({
        message: 'Error en el servidor'
      })

    }

  },
  
  GetUserById: async (req, res) => {

    try {

      const id = req.params.id
      const user = await userModel.findOne({ _id: id }).select(['-password'])
      return res.status(200).send(user)

    } catch (error) {
      return res.status(500).send({})
    }

  },

  GetUserByUsername: async (req, res) => {

    try {

      const username = req.params.username
      const user = await userModel.findOne({ username: username }).select(['-password'])
      return res.status(200).send(user)

    } catch (error) {
      return res.status(500).send({})
    }

  }

}

