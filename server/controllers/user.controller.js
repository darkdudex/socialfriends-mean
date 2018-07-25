'use strict'

import userModel from '../models/model.user/user.model'
import service from '../auth/jwt'
import utilities from '../utilities/utilities'

const EncryptPassword = (req) => {
  const _EncryptPassword = utilities.EncodePassword(req.body.password)
  req.body.password = _EncryptPassword
}

export default {

  SignUp: async (req, res) => {

    try {

      EncryptPassword(req)
      const user = await userModel.insertMany(req.body)

      return res.status(200).send({
        message: 'Verifica tu cuenta en el link que te enviamos por correo electrónico'
      })

    } catch (error) {

      return res.status(500).send({
        message: `Error al crear el usuario: ${error}`
      })

    }
  },

  SignIn: async (req, res) => {

    try {

      const { account, password } = req.body

      let user = {}

      if (utilities.CheckIsEmail(account))
        user = await userModel.findOne({ email: account })
      else
        user = await userModel.findOne({ username: account })

      req.user = user

      if (utilities.DecodePassword(password, user.password)) {

        user.password = null;

        // The user account is valid and state is verify.
        if (user.state) {
          return res.status(200).send({
            token: service.CreateToken(user),
            user: user,
            status: 200
          })
        }

        // The user account is valid but a state account is not verify in the email.
        return res.status(200).send({
          message: 'Verifica tu cuenta en el link que te enviamos por correo electrónico',
          status: 200
        })
      }

      return res.status(404).send({
        status: 404
      })

    } catch (error) {
      return res.status(404).send({
        status: 404
      })
    }
  },

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

