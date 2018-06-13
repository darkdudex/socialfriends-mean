'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const LikeSchema = new Schema({
  publicationId: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  }
},{ versionKey: false })

module.exports = mongoose.db.model('Like', LikeSchema)