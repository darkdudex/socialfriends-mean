'use strict'

const config = require('../config/config')
const Schema = config.db.Schema

const GroupSchema = new Schema({

},{ versionKey: false })

module.exports = mongoose.db.model('Group', GroupSchema)