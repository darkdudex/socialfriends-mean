'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const api = require('./routes/routes')
const morgan = require('morgan')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, user, admin_secret");
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => { res.status(200).redirect('/api') })
app.use('/api', api)

module.exports = app