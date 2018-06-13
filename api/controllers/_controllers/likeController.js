'use strict'

const likeModel = require('../../models/like')
const publicationModel = require('../../models/publication')

//#region AddLike 
async function AddLike(req, res) {

  try {

    
    const body = {
      publicationId: req.body.publicationId,
      userId: req.body.userId,
    }

    const find = await likeModel.findOne(body)

    if (find == null) {
      const response = await likeModel.insertMany(body)
      const x = await publicationModel.findOneAndUpdate({ _id: body.publicationId}, { $push: { like: response[0] } }, { new: true })
      return res.status(200).send(response[0])
    }

    return res.status(500).send({
      message: `Error`
    })

  } catch (error) {

    return res.status(500).send({
      message: `Error al dar like ${error}`
    })

  }
}
//#endregion

//#region RemoveLike 
async function RemoveLike(req, res) {
  try {

    const Like = await likeModel.findOneAndRemove({
      publicationId: req.body.publicationId,
      userId: req.body.userId,
    })

    return res.status(200).send(Like)

  } catch (error) {

    return res.status(500).send({
      message: `Error al dar like ${error}`
    })

  }
}
//#endregion

//#region GetLikeByUserId 
async function GetLikeByPublicationId(req, res) {

  // let page = req.query.page
  // const limit = 6

  // if (page >= 1)
  //   page = page - 1
  // else
  //   page = 0

  try {

    const publicationId = req.params.publicationId
    const Likes = await likeModel.find({ publicationId })//.limit(limit).skip(page * limit)
    const total = await likeModel.find({ publicationId }).count()

    return res.status(200).send({ Likes, total })

  } catch (error) {

    return res.status(500).send({})

  }
}
//#endregion

module.exports = {
  AddLike,
  RemoveLike,
  GetLikeByPublicationId
}