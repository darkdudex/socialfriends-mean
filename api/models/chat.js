'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const ChatSchema = new Schema({

},{ versionKey: false })

module.exports = mongoose.db.model('Chat', ChatSchema)