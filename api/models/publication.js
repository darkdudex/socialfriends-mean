'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const PublicationSchema = new Schema({
  message: String,
  userId: String,
  filePublication: Array,
  creationDate: { type: Date, default: Date.now()},
},{ versionKey: false })

module.exports = mongoose.db.model('Publication', PublicationSchema)