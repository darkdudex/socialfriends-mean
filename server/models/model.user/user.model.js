'use strict'

import config from '../../config/config'

const { Schema } = config.mongoose

const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  avatar: { type: String, default: defaultImage },
  email: { type: String, required: true, unique: true, lowercase: true },
  username: {
    unique: true,
    type: String,
    required: true,
    lowercase: true,
    minlength: [6, 'Username Should be minimum 8 Characters long'], maxlength: [16, 'Username can be maximum of 16 characters']
  },
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  state: { type: Boolean, default: false },
  providerId: String
}, { versionKey: false })

export default config.mongoose.model('User', UserSchema) 
