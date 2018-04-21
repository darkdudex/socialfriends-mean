'use strict'

const userModel = require('../../models/user')
const service = require('../../services/services')
const bcrypt = require('bcrypt-nodejs')

function EncodePassword(password) {
  return bcrypt.hashSync(password)
}

function DecodePassword(password, passwordEncode) {
  return bcrypt.compareSync(password, passwordEncode)
}

//#region CheckIsEmail 
function CheckIsEmail(account) {

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  if (!reg.test(account))
    return false

  return true
}
//#endregion

//#region SignUp 
async function SignUp(req, res) {

  try {

    const user = await userModel.insertMany({
      email: req.body.email,
      displayName: req.body.displayName,
      password: EncodePassword(req.body.password),
      providerId: req.body.providerId,
      avatar: req.body.avatar,
      username: req.body.username
    })

    return res.status(200).send({
      message: 'Verifica tu cuenta en el link que te enviamos por correo electrónico'
    })

  } catch (error) {

    return res.status(500).send({
      message: `Error al crear el usuario: ${error}`
    })

  }
}
//#endregion

//#region SignIn 
async function SignIn(req, res) {

  try {

    const account = req.body.account
    const password = req.body.password

    let user = {}

    if (CheckIsEmail(account))
      user = await userModel.findOne({ email: account })
    else
      user = await userModel.findOne({ username: account })

    req.user = user

    if (DecodePassword(password, user.password)) {

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
}
//#endregion

//#region GetUsers 
async function GetUsers(req, res) {

  let page = req.query.page
  const limit = 6

  if (page >= 1)
    page = page - 1
  else
    page = 0

  try {
    const users = await userModel.find().select(['-password']).limit(limit).skip(page * limit)
    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({
      message: 'Error en el servidor'
    })
  }

}
//#endregion

//#region GetUserById 
async function GetUserById(req, res) {

  try {

    const id = req.params.id
    const user = await userModel.findOne({ _id: id }).select(['-password'])
    return res.status(200).send(user)

  } catch (error) {
    return res.status(500).send({})
  }

}
//#endregion

module.exports = {
  SignUp,
  SignIn,
  GetUsers,
  GetUserById
}
