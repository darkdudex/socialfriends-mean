'use strict'

const commentModel = require('../../models/comment')
const publicationModel = require('../../models/publication')

async function AddComment(req, res) {

  try {

    const body = {
      comment: req.body.comment,
      publicationId: req.body.publicationId,
      userId: req.body.userId,
      creationDate: Date.now()
    }

    const response = await commentModel.insertMany(body)

    const x = await publicationModel.findOneAndUpdate({ _id: body.publicationId}, { $push: { comment: response[0] } }, { new: true })

    res.status(200).send(response[0])

  } catch (error) {

  }

}

async function GetcommentByPublicationId(req, res) {

  try {

    const publicationId = req.params.publicationId

    console.log(publicationId)

    const response = await commentModel.find({ publicationId })
      .populate({ path: 'userId', select: ' avatar displayName _id' })

    res.status(200).send(response)

  } catch (error) {
    res.status(200).send({ m: 'ads' })
  }

}

async function DeleteCommentById() {

}

async function UpdateCommentById() {

}


module.exports = {
  AddComment,
  GetcommentByPublicationId,
  DeleteCommentById,
  UpdateCommentById
}