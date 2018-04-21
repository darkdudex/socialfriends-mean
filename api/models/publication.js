'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const PublicationSchema = new Schema({
  message: String,
  userId: String,
  filePublication: String,
  creationDate: String,
},{ versionKey: false })

module.exports = mongoose.db.model('Publication', PublicationSchema)