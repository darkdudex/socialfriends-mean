'use strict'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

const beautify = require("json-beautify")
const should = chai.should()
const assert = chai.assert

chai.use(chaiHttp)

describe('Login Controller Test', () => {

  let should = chai.should()

  it('[SignUp]', (done) => {

    chai.request(server)
      .post('/api/signup')
      .send({
        email: 'jbatty@yopmail.com',
        displayName: 'Juan Manuel Batty Linero',
        password: '12345',
        providerId: 'email.com',
        avatar: 'https://avatars2.githubusercontent.com/u/228746423',
        username: 'jbatty'
      })
      .end((err, res) => {

        try {
          res.should.have.status(200)
          console.log(beautify(res.body, null, 2, 100))
          done()
        } catch (err) {
          done(err)
        }

      })

  })

  it('[SignIn]', (done) => {

    chai.request(server)
      .post('/api/signin')
      .send({
        account: 'jmbl1685',
        password: '12345'
      })
      .end((err, res) => {

        if (err) done(err)
        res.should.have.status(200)
        console.log(beautify(res.body, null, 2, 100))
        done()

      })

  })

})