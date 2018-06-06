'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const CommentSchema = new Schema({
  comment: String,
  publicationId: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  creationDate: Date
}, { versionKey: false })

module.exports = mongoose.db.model('Comment', CommentSchema)