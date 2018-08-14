'use strict'

import mongoose from './mongoose'

const url = {
  localhost: 'http://localhost:3000',
  laptop: 'http://192.168.1.66:3000',
  heroku: 'https://socialfriends-restapi.herokuapp.com'
}

export default {
  server: {
    port: process.env.PORT || 3000,
    message: `Server running in the port `
  },
  SECRET_TOKEN: 'xxxeyabcJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ91685',
  mongoose,
  url: url.laptop
}
