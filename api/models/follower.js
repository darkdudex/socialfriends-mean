'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const FollowerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field']
  },
  followDate: { type: Date, default: Date.now() }
}, { versionKey: false })

module.exports = mongoose.db.model('Follower', FollowerSchema)