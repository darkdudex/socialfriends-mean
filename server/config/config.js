'use strict'

import mongoose from './mongoose'

export default {
  server: {
    port: process.env.PORT || 3000,
    message: `Server running in the port `
  },
  SECRET_TOKEN: 'xxxeyabcJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ91685',
  mongoose
}
