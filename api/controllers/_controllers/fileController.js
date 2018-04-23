'use strict'

const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');
const shortid = require('shortid');

let formData_Key = 'file';
let tokenId = shortid.generate();

const multer = Multer({
  storage: Multer.memoryStorage()
});

const storage = googleStorage({
  keyFilename: `${__dirname}/../../config/googleapi-credentials.json`
});

const bucket = storage.bucket('gs://db-firebase-5cf99.appspot.com');

function uploadImageToStorage(files, userId, mainFolder) {

  let prom = new Promise((resolve, reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      reject('Not file');
    }

    files.map((file, i) => {

      let nameFile = Date.now();
      let folderPath = `socialfriends-mean/${mainFolder}/${userId}`;
      let newFileName = `${folderPath}/${nameFile}`;

      let fileUpload = bucket.file(newFileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: tokenId
          }
        },
      });

      blobStream.on('error', error => {
        reject(error);
      });

      blobStream.on('finish', data => {

        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${tokenId}`
        fileUpload.getSignedUrl({ action: 'read' })
        arrayFile.push({ url: url, type: file.mimetype})

        if (arrayFile.length == (files.length))
          resolve(arrayFile);

      });

      blobStream.end(file.buffer);

    });

  })

  return prom;

}

async function AddFile(req, res) {

  try {

    let files = req.files;
    let userId = req.body.userId
    let mainFolder = req.body.mainFolder

    if (files.length >= 1) {

      const response = await uploadImageToStorage(files, userId, mainFolder)
      return res.status(200).send(response);

    }

    return res.status(400).send({
      status: 'File required'
    });

  } catch (error) {
    return res.status(400).send({
      status: 'an error has ocurred'
    });
  }





}

module.exports = {
  uploadImageToStorage,
  AddFile
}


// 'use strict'

// const firebase = require('firebase');
// const googleStorage = require('@google-cloud/storage');
// const Multer = require('multer');
// const shortid = require('shortid');

// let formData_Key = 'file';
// let tokenId = shortid.generate();

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   }
// });

// const storage = googleStorage({
//   keyFilename: __dirname + "/../../config/googleapi-credentials.json"
// });

// const bucket = storage.bucket("gs://db-firebase-5cf99.appspot.com");

// function uploadImageToStorage(file, userId, mainFolder) {

//   let prom = new Promise((resolve, reject) => {

//     if (!file) {
//       reject('Not file');
//     }

//     let nameFile = Date.now();
//     let folderPath = `socialfriends-mean/${mainFolder}/${userId}`;
//     let newFileName = `${folderPath}/${nameFile}`;

//     let fileUpload = bucket.file(newFileName);

//     const blobStream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype,
//         metadata: {
//           firebaseStorageDownloadTokens: tokenId
//         }
//       },
//     });

//     blobStream.on('error', error => {
//       reject(error);
//     });

//     blobStream.on('finish', data => {
//       // The public URL can be used to directly access the file via HTTP.
//       const url = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(fileUpload.name) + "?alt=media&token=" + tokenId;
//       fileUpload.getSignedUrl({
//         action: 'read'
//       }).then(signedUrls => {
//         // signedUrls[0] contains the file's public URL
//       });
//       resolve(url);
//     });

//     blobStream.end(file.buffer);
//   });
//   return prom;
// }

// function AddFile(req, res) {

//   let files = req.files;
//   let userId = req.body.userId
//   let mainFolder = req.body.mainFolder

//   if (files.length >= 1) {

//     files.map(file => {

//       uploadImageToStorage(file, userId, mainFolder)
//         .then(data => {

//           return res.status(200).send(data);

//         })
//         .catch(err => {
//           console.log(err)
//         })
//     })



//   } else {

//     return res.status(400).send({
//       status: 'File required'
//     });

//   }

// }

// module.exports = {
//   uploadImageToStorage,
//   AddFile
// }