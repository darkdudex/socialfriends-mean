'use strict'

const userModel = require('../models/user')
const service = require('../services/services')
const bcrypt = require('bcrypt-nodejs')

function EncodePassword(password) {
  return bcrypt.hashSync(password)
}

function DecodePassword(password, passwordEncode) {
  return bcrypt.compareSync(password, passwordEncode);
}

function checkisEmail(account) {

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (!reg.test(account))
    return false

  return true;
}

async function signUp(req, res) {

  try {
    const user = await userModel.insertMany({
      email: req.body.email,
      displayName: req.body.displayName,
      password: EncodePassword(req.body.password),
      providerId: req.body.providerId,
      avatar: req.body.avatar,
      username: req.body.username
    });
    return res.status(200).send({
      token: service.CreateToken(user)
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al crear el usuario: ${error}`
    })
  }
}

async function signIn(req, res) {

  try {
    const account = req.body.account
    const password = req.body.password

    let user = null

    if (checkisEmail(account))
      user = await userModel.findOne({ email: account });
    else
      user = await userModel.findOne({ username: account });

    req.user = user

    if (DecodePassword(password, user.password)) {

      // The user account is valid and state is verify.
      if (user.state) {
        return res.status(200).send({
          token: service.CreateToken(user)
        })
      }

      // The user account is valid but a state account is not verify in the email.
      return res.status(200).send({
        message: 'Verifica tu cuenta en el link que te enviamos por correo electrónico'
      })
    }

    return res.status(404).send({
      message: 'No existe el usuario'
    })

  } catch (error) {
    return res.status(500).send({
      message: 'No existe el usuario'
    })
  }
}

async function getUsers(req, res) {

  let page = req.query.page
  const limit = 5;

  try {
    const users = await userModel.find().select(['-password']).limit(limit).skip(page * limit)
    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({
      message: 'Error en el servidor'
    })
  }

}

async function getUser(req, res) {

  const id = req.params.id
  let page = req.params.page
  const limit = 5;

  const user = await userModel.findOne({ _id: id }).select(['-password']).limit(limit).sort(page * limit)
  console.log(user)
}

module.exports = {
  signUp,
  signIn,
  getUser,
  getUsers
}
