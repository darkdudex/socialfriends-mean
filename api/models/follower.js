'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const FollowerSchema = new Schema({
  userId: String,
  followerId: String,
  followDate: { type: Date, default: Date.now() }
},{ versionKey: false })

module.exports = mongoose.db.model('Follower', FollowerSchema)