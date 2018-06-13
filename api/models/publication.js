'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const PublicationSchema = new Schema({
  message: String,
  userId: String,
  filePublication: Array,
  creationDate: Date,
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }],
},{ versionKey: false })

module.exports = mongoose.db.model('Publication', PublicationSchema)