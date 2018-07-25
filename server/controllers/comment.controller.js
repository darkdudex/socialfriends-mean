'use strict'

import commentModel from '../models/model.comment/comment.model'
import publicationModel from '../models/model.publication/publication.model'

export default {

  AddComment: async (req, res) => {

    try {

      const body = {
        comment: req.body.comment,
        publicationId: req.body.publicationId,
        userId: req.body.userId,
        creationDate: Date.now()
      }

      const response = await commentModel.insertMany(body)

      console.log(response[0])

      const commentsNum = await publicationModel.findOne({ _id: body.publicationId })

      const x = await publicationModel.findOneAndUpdate(
        { _id: body.publicationId },
        {
          $push: { comment: response[0] },
          $set: { totalComment: commentsNum.comment.length }
        }
        , { new: true })

      res.status(200).send(response[0])

    } catch (error) {

    }

  },

  GetcommentByPublicationId: async (req, res) => {

    try {

      const publicationId = req.params.publicationId
      const page = req.query.page

      console.log(page)

      const response = await commentModel.find({ publicationId })
        .populate({ path: 'userId', select: ' avatar displayName _id' }).limit(5).skip(page * 5)

      res.status(200).send(response)

    } catch (error) {
      res.status(200).send({ m: 'ads' })
    }

  },
  DeleteCommentById: () => {

  },
  UpdateCommentById: () => {

  }

}