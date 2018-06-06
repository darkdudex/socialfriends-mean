'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const PublicationSchema = new Schema({
  message: String,
  userId: String,
  filePublication: Array,
  creationDate: Date
},{ versionKey: false })

module.exports = mongoose.db.model('Publication', PublicationSchema)