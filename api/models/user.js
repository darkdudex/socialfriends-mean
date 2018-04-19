'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const UserSchema = new Schema({
  displayName: String,
  avatar: { type: String, default: 'https://gracegb.org/instance/00-12/themes/default/images/profile.png' },
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, lowercase: true},
  password: { type: String },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  state: { type: Boolean, default: false },
  providerId: String,
  //birthDate: Date
}, { versionKey: false })

module.exports = mongoose.db.model('User', UserSchema)
