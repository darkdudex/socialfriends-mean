'use strict'

const publicationModel = require('../../models/publication')
const utilities = require('../../utilities/utilities')

//#region AddPublication 
async function AddPublication(req, res) {

  try {

    const p = {
      message: req.body.message,
      userId: req.body.userId,
      filePublication: req.body.filePublication,
      creationDate: Date.now()
    }

    if (utilities.isEmpty(p))
    return res.status(400).send({
      message: 'Complete los campos requeridos'
    })

    const publication = await publicationModel.insertMany(p)

    return res.status(200).send(publication)

  } catch (error) {

    return res.status(500).send({
      message: `Error al crear la publicación ${error}`
    })

  }
}
//#endregion

//#region UpdatePublication 
async function UpdatePublication(req, res) {

}
//#endregion

//#region RemovePublication 
async function RemovePublication(req, res) {

}
//#endregion

//#region GetPublicationByUserId 
async function GetPublicationByUserId(req, res) {

  let page = req.query.page
  const limit = 6

  if (page >= 1)
    page = page - 1
  else
    page = 0

  try {

    const userId = req.params.userId

    const publications = await publicationModel.find({ userId }).limit(limit).skip(page * limit).sort({ creationDate: 'desc' })
      .populate({ path: 'comment', populate: { path: 'userId', select: ' avatar displayName _id' }, /*options: { limit: 5, skip: 2 } */ })

    const total = await publicationModel.find({ userId }).count()

    return res.status(200).send({ publications, total })

  } catch (error) {

    return res.status(500).send({
      message: 'Error en el servidor'
    })

  }
}
//#endregion

module.exports = {
  AddPublication,
  UpdatePublication,
  RemovePublication,
  GetPublicationByUserId
}