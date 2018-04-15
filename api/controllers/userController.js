'use strict'

const userModel = require('../models/user')
const service = require('../services/services')

async function signUp(req, res) {
  try {

    const user = await userModel.insertMany({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      providerId: req.body.providerId,
      avatar: req.body.avatar
    });

    return res.status(200).send({ token: service.CreateToken(user) })

  } catch (error) {
    return res.status(500).send({ message: `Error al crear el usuario: ${error}` })
  }

}

async function signIn(req, res) {
  userModel.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}