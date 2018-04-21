'use strict'

const fs = require('fs')
const path = require('path')

const folderControllers = __dirname + '/_controllers/'
const files = fs.readdirSync(folderControllers)

files.map(file => {
  const fileName = path.basename(file, '.js')
  exports[fileName] = require(folderControllers + file)
})
