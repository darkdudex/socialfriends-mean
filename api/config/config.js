'use strict'

const mongoose = require('mongoose');

const urlMongoDBService = {
  dev: 'mongodb://localhost:27017/SocialFriends',
  production: 'xxx'
}

mongoose.Promise = global.Promise;
mongoose.connect(urlMongoDBService.dev);

module.exports = {
  port: process.env.PORT || 3000,
  db: mongoose,
  SECRET_TOKEN: 'xxxeyabcJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ91685'
}
