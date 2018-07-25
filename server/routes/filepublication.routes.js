'use strict'

import fileController from '../controllers/file.controller'
import auth from '../auth/auth'
import Multer from 'multer'

import { errors } from 'celebrate'

const multer = Multer({
  storage: Multer.memoryStorage()
})

export default (app) => {

  app.post('/api/fileupload', auth.isAuth, multer.array('files', 100), fileController.AddFile)

}