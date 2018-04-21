'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const LikeSchema = new Schema({
  publicationId: String,
  userId: String,
},{ versionKey: false })

module.exports = mongoose.db.model('Like', LikeSchema)