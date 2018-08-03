'use strict'

/* 
  OBS: 
    Tengo que mejorar los métodos de subida de archivos (redundancia).
*/

import googleStorage from '@google-cloud/storage'
import Multer from 'multer'
import shortid from 'shortid'
import fs from 'fs'
import { resolve } from 'path'
import cloudinary from 'cloudinary'
import utilities from '../utilities/utilities'

let formData_Key = 'file'
let tokenId = shortid.generate()

const multer = Multer({
  storage: Multer.memoryStorage()
})

const storage = googleStorage({
  keyFilename: `${__dirname}/../config/public_credentials/firebase_storage.json`
})

cloudinary.config(`${__dirname}/../config/public_credentials/cloudinary_storage.json`)

const bucket = storage.bucket('gs://db-firebase-5cf99.appspot.com')


const UploadStorageCloudinary = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }


    files.map((file, i) => {

      let nameFile = Date.now()

      const resource_type = file.mimetype.includes('image') ? 'image' : 'video';

      cloudinary.uploader.upload_stream(
        result => {

          const url = result.url
          arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

          if (arrayFile.length == (files.length))
            _resolve(arrayFile)

        }, { resource_type: resource_type }).end(file.buffer)
    })

  })

  return prom

}

const UploadStorageServer = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }

    let folderPath = resolve(`./storage_files`)

    files.map((file, i) => {

      let nameFile = Date.now()
      let ext = utilities.GetFileExtension(file.originalname)

      let newFileName = `${folderPath}/${nameFile}.${ext}`

      const blobStream = fs.createWriteStream(newFileName)

      console.log(blobStream)

      blobStream.on('error', error => {
        _reject(error)
      })

      blobStream.on('finish', data => {

        const url = `http://192.168.1.66:3000/${nameFile}.${ext}`
        arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

        if (arrayFile.length == (files.length))
          _resolve(arrayFile)

      })

      blobStream.end(file.buffer)

    })

  })

  return prom

}

const UploadStorageFirebase = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }

    files.map((file, i) => {

      let nameFile = Date.now()
      let folderPath = `socialfriends-mean/${mainFolder}/${userId}`
      let newFileName = `${folderPath}/${nameFile}`

      let fileUpload = bucket.file(newFileName)

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: tokenId
          }
        },
      })

      blobStream.on('error', error => {
        _reject(error)
      })

      blobStream.on('finish', data => {

        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${tokenId}`
        fileUpload.getSignedUrl({ action: 'read' })
        arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

        if (arrayFile.length == (files.length))
          _resolve(arrayFile)

      })

      blobStream.end(file.buffer)

    })

  })

  return prom
}

export default {

  AddFile: async (req, res) => {

    try {

      let data = {
        files: req.files,
        userId: req.body.userId,
        folderName: req.body.folderName
      }

      if (data.files.length >= 1) {

        const response = await UploadStorageServer(data.files, data.userId, data.folderName)
        return res.status(200).send(response)

      }

      return res.status(400).send({
        status: 'File required'
      })

    } catch (error) {
      return res.status(400).send({
        status: 'an error has ocurred'
      })
    }

  }

}