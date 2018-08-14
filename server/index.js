'use strict'

import server from './websocket'
import config from './config/config'
import winston from './config/logs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const port = config.server.port

/* 15 minutos en Milisegundos */
const MIN_15 = 900000

/* Wake Up Heroku Server */
// setInterval(() => {
//     fetch('https://socialfriends-restapi.herokuapp.com')
//         .then( response => {
//             return response.text()
//         })
//         .then( () =>{
//             let date = new Date(Date.now()).toLocaleString()
//             console.log(`Wake Up [Server] ${date}`)
//         })
// }, MIN_15)

server.listen(port, () =>
    console.log(chalk.blue(`${config.server.message}${port}`)))
