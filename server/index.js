'use strict'

import server from './websocket'
import config from './config/config'
import winston from './config/logs'
import chalk from 'chalk'

const port = config.server.port

server.listen(port, () =>
    console.log(chalk.blue(`${config.server.message}${port}`)))
