'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const UserSchema = new Schema({
  displayName: { type: String, required: true},
  avatar: { type: String, default: 'https://gracegb.org/instance/00-12/themes/default/images/profile.png' },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, unique: true, required: true, lowercase: true},
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  state: { type: Boolean, default: true },
  providerId: String,
  //birthDate: Date
}, { versionKey: false })

module.exports = mongoose.db.model('User', UserSchema)
