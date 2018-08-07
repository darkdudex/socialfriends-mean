'use strict'

import userModel from '../models/model.user/user.model'
import service from '../auth/jwt'
import utilities from '../utilities/utilities'
import sendemail from '../utilities/send_email'

export default {

  SignUp: async (req, res) => {

    try {

      utilities.EncryptPassword(req)
      const user = await userModel.insertMany(req.body)

      /*
        if (user.length > 0)
          sendemail.SendEmail(user[0])
      */

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

      user = await userModel.findOne({
        $or: [
          { email: account },
          { username: account }
        ]
      })

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

        // Verifica tu cuenta en el link que te enviamos por correo electrónico
        // The user account is valid but a state account is not verify in the email.
        return res.status(200).send({
          code: 30,
          status: 200
        })
      }

      return res.status(403).send({
        code: 25,
        status: 403
      })

    } catch (error) {
      return res.status(404).send({
        status: 404
      })
    }
  }

}

