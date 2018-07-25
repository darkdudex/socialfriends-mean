'use strict'

import chai from 'chai'
import server from '../app'
import chaiHttp from 'chai-http'

const should = chai.should()
const assert = chai.assert

chai.use(chaiHttp)

describe('Login Controller Test', () => {

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
        res.should.have.status(200) 
        res.should.be.json
        done()
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
        res.should.have.status(200)
        res.should.be.json
        done()
      })

  })

})