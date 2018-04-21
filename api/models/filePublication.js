'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const FilePublicationSchema = new Schema({
  publicationId: String,
  path: String,
  type: String,
  creationDate: String,
},{ versionKey: false })

module.exports = mongoose.db.model('FilePublication', FilePublicationSchema)