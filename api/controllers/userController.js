'use strict'

const userModel = require('../models/user')
const service = require('../services/services')

async function signUp (req, res) {
  const user = new userModel({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
    providerId: req.body.providerId,
    avatar: req.body.avatar
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

async function signIn (req, res) {
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