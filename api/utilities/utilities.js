'use strict'

const bcrypt = require('bcrypt-nodejs')

function isEmpty(json) {
  for (let key in json) {
    if (json[key] === "") return true
  }
  return false
}

function EncodePassword(password) {
  return bcrypt.hashSync(password)
}

function DecodePassword(password, passwordEncode) {
  return bcrypt.compareSync(password, passwordEncode)
}

//#region CheckIsEmail 
function CheckIsEmail(account) {

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  if (!reg.test(account))
    return false

  return true
}
//#endregion

module.exports = {
  isEmpty,
  EncodePassword,
  DecodePassword,
  CheckIsEmail
}