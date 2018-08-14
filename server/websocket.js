'use strict'

import app from './app'

import http from 'http';
import SocketIO from 'socket.io';

const server = http.Server(app);
const io = new SocketIO(server);

io.on('connection', socket => {

    socket.on('ALL_NOTIFICATIONS', res => {
        
        switch (res.option) {

            case 'follower': {
                io.emit('ALL_NOTIFICATIONS', res)
                break
            }

            case 'like': {
                io.emit('ALL_NOTIFICATIONS', res)
                break
            }

            case 'dislike': {
                io.emit('ALL_NOTIFICATIONS', res)
                break
            }

            case 'comment': {
          
                io.emit('ALL_NOTIFICATIONS', res)
                break
            }
        }
    })
})

export default server

