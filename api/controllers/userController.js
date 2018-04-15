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

async function signUp(req, res) {
  try {
    const user = await userModel.insertMany({
      email: req.body.email,
      displayName: req.body.displayName,
      password: EncodePassword(req.body.password),
      providerId: req.body.providerId,
      avatar: req.body.avatar
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
    const email = req.body.email;
    const password = req.body.password
    const user = await userModel.findOne({ email });
    req.user = user

    if(DecodePassword(password,user.password)){
      return res.status(200).send({
        token: service.CreateToken(user)
      })
    }

    return res.status(404).send({
      message: 'No existe el usuario' 
    })

  } catch (error) {
    return res.status(500).send({ 
      message: 'Error en el servidor' 
    })
  }
}

module.exports = {
  signUp,
  signIn
}
