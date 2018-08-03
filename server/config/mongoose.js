'use strict'

import mongoose from 'mongoose'
import winston from './logs'

const urlMongoDBService = {
  dev: 'mongodb://localhost:27017/socialfriends-mean',
  production: 'mongodb://root:root@ds019688.mlab.com:19688/socialfriends-mean'
}

mongoose.Promise = global.Promise
mongoose.connect(urlMongoDBService.production, { useNewUrlParser: true })
  .catch(err => winston.error('[ERROR MONGODB]', err))

export default mongoose