'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const FollowerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  followDate: { type: Date, default: Date.now() }
},{ versionKey: false })

module.exports = mongoose.db.model('Follower', FollowerSchema)