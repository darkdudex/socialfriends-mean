'use strict'

const app = require('./app');
const config = require('./config/config')
const chalk = require('chalk')

app.listen(config.port, () => {
  console.log(`${chalk.blue('Server running')}`)
})