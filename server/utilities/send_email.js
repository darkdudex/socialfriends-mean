'use strict'

import nodemailer from 'nodemailer'

const emailClient = {
  GMAIL: {
    host: 'smtp.gmail.com',
    port: 465
  },
  HOTMAIL: {
    host: 'smtp-mail.outlook.com',
    port: 587
  }
}

export default {

  SendEmail: (user) => {

    let transporter = nodemailer.createTransport({
      host: emailClient.HOTMAIL.host,
      secureConnection: false,
      port: emailClient.HOTMAIL.port,
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: 'EMAIL_ACCOUNT',
        pass: 'EMAIL_PASSWORD'
      }
    })

    let mailOptions = {
      from: '"Welcome back, SocialFriends" ',
      to: user.email,
      subject: 'Registro SocialFriends! ',
      text: 'Registro SocialFriends!',
      html: `Hola, <b>${user.displayName}</b><br> Gracias por hacer parte de SocialFriends! , entra a la plataforma para que hagas nuevos amigos. <br>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error)
        console.log(error)
        
      console.log(`[MESSAGE SENT] [${user.email}]`)
    })
  }

}



