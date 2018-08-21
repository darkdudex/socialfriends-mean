'use strict'

const express = require ('express')
const app = express()
const port = process.env.PORT || 4200
const cors = require('cors')

app.use(cors())
app.use(express.static(`${__dirname}/dist/socialfriends`))
app.get('*', (req,res) => {
  res.sendFile(`${__dirname}/dist/socialfriends/index.html`)
})

app.listen(port, () => {
  console.log('Server running')
})