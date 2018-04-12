'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: { type: String, /* unique: true, */ lowercase: true},
  avatar: String,
  password: String,
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  state: { type: Boolean, default: false },
  providerId: String,
  //birthDate: Date
}, { versionKey: false })

module.exports = mongoose.db.model('User', UserSchema)
