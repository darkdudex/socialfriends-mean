'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const FilePublicationSchema = new Schema({
  url: String,
  type: String,
},{ versionKey: false })

module.exports = mongoose.db.model('FilePublication', FilePublicationSchema)