'use strict'

import commentModel from '../models/model.comment/comment.model'
import publicationModel from '../models/model.publication/publication.model'

export default {

  AddComment: async (req, res) => {

    try {

      req.body.creationDate = Date.now()
      const response = await commentModel.insertMany(req.body)
      const { publicationId } = req.body
      const commentsNum = await publicationModel.findOne({ _id: publicationId })
      const x = await publicationModel.findOneAndUpdate(
        { _id: publicationId },
        {
          $push: { comment: response[0] },
          $set: { totalComment: commentsNum.comment.length }
        }
        , { new: true })

      return res.status(200).send(response[0])

    } catch (error) {
      return res.status(500).send({ error: `An error has ocurred, ${error}` })
    }

  },

  GetcommentByPublicationId: async (req, res) => {

    try {

      const publicationId = req.params.publicationId
      const page = req.query.page
      const response = await commentModel.find({ publicationId })
        .populate({ path: 'userId', select: ' avatar displayName _id' }).limit(5).skip(page * 5)

      return res.status(200).send(response)

    } catch (error) {
      return res.status(500).send({ error: `An error has ocurred, ${error}` })
    }

  },
  DeleteCommentById: () => {

  },
  UpdateCommentById: () => {

  }

}