'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const FollowerSchema = new Schema({
  publicationId: String,
  userId: String,
  followDate: { type: Date, default: Date.now() }
},{ versionKey: false })

module.exports = mongoose.db.model('Follower', FollowerSchema)