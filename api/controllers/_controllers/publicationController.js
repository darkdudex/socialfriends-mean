'use strict'

const publicationModel = require('../../models/publication')

//#region AddPublication 
async function AddPublication(req, res) {

  try {

    const publication = await publicationModel.insertMany({
      message: req.body.message,
      userId: req.body.userId,
      filePublication: req.body.filePublication
    })

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
    const publications = await publicationModel.find({ userId }).limit(limit).skip(page * limit)
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