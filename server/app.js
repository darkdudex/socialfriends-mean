'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression({}))

app.use(express.static('storage_files'))

require('./routes/comment.routes').default(app)
require('./routes/filepublication.routes').default(app)
require('./routes/follower.routes').default(app)
require('./routes/like.routes').default(app)
require('./routes/publication.routes').default(app)
require('./routes/user.routes').default(app)
require('./routes/login.routes').default(app)
require('./routes/group.routes').default(app)
require('./routes/notifications.routes').default(app)

//require('./routes/chat.routes').default(app)


export default app