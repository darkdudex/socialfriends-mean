'use strict'

const mongoose = require('../config/config')
const Schema = mongoose.db.Schema

const UserSchema = new Schema({
  displayName: { type: String, required: true},
  avatar: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, unique: true, required: true, lowercase: true},
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  state: { type: Boolean, default: false },
  providerId: String,
  //birthDate: Date
}, { versionKey: false })

module.exports = mongoose.db.model('User', UserSchema)
