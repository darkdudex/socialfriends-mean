'use strict'

import publicationModel from '../models/model.publication/publication.model'
import utilities from '../utilities/utilities'

export default {

  AddPublication: async (req, res) => {

    try {

      const p = {
        message: utilities.FindUserMessagePublication(req.body.message),
        userId: req.body.userId,
        filePublication: req.body.filePublication,
        creationDate: Date.now()
      }

      const publication = await publicationModel.insertMany(p)

      return res.status(200).send(publication)

    } catch (error) {

      return res.status(500).send({
        message: `Error al crear la publicación ${error}`
      })

    }
  },

  UpdatePublication: async (req, res) => {

  },

  RemovePublication: async (req, res) => {

    const publicationId = req.params.publicationId

    const response = await publicationModel.findByIdAndRemove()

  },

  GetPublicationByUserId: async (req, res) => {

    let page = req.query.page
    const limit = 6

    if (page >= 1)
      page = page - 1
    else
      page = 0

    try {

      const userId = req.params.userId

      const publications = await publicationModel.find({ userId }).limit(limit).skip(page * limit).sort({ creationDate: 'desc' })
        .populate({ path: 'comment', options: { limit: 5, skip: 1, sort: { creationDate: 'desc' }, populate: { path: 'userId', select: ' avatar displayName _id' } } })
        .populate({ path: 'like', populate: { path: 'userId', select: ' avatar displayName _id' }, })

      const total = await publicationModel.find({ userId }).count()

      return res.status(200).send({ publications, total })

    } catch (error) {

      return res.status(500).send({
        message: 'Error en el servidor'
      })

    }
  }

}