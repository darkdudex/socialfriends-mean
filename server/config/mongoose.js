'use strict'

import mongoose from 'mongoose'
import winston from './logs'
// import { } from 'dotenv/config' /* npm i dotenv */

const host = {
  DEV: 'mongodb://localhost:27017/socialfriends-mean',
  PRODUCTION: 'mongodb://root:root@ds019688.mlab.com:19688/socialfriends-mean'
}

mongoose.Promise = global.Promise
mongoose.connect(host.DEV, { useNewUrlParser: true })
  .catch(err => winston.error('[ERROR MONGODB]', err))

export default mongoose