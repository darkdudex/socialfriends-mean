'use strict'

import app from './app'
import config from './config/config'
import winston from './config/log'
import chalk from 'chalk'

import http from 'http';
import SocketIO from 'socket.io';

const server = http.Server(app);
const io = new SocketIO(server);
const port = config.server.port

io.on('connection', socket => {

    socket.on('ALL_NOTIFICATIONS', res => {

        switch (res.option) {

            case 'follower': {
                io.emit('ALL_NOTIFICATIONS', res)
                break
            }
        }
    })
})

server.listen(port, () =>
    console.log(chalk.green(`${config.server.message}${port}`)))
