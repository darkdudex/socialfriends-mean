'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose
 
const ChatSchema = new Schema({

},{ versionKey: false })

export default config.mongoose.model('Chat', ChatSchema)