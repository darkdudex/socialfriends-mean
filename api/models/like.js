'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const LikeSchema = new Schema({
  publicationId: String,
  userId: String,
},{ versionKey: false })

module.exports = mongoose.db.model('Like', LikeSchema)