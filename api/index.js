'use strict'

const app = require('./app');
const config = require('./config/config')
const chalk = require('chalk')

const port = config.port;

app.listen(port, () => {
  console.log(`${chalk.blue(`Server running [http://localhost:${port}/api]`)}`)
})