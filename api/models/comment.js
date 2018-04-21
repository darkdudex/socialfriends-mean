'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const CommentSchema = new Schema({
  comentario: String,
  publicationId: String,
  userId: String,
  creationDate: String,
},{ versionKey: false })

module.exports = mongoose.db.model('Comment', CommentSchema)