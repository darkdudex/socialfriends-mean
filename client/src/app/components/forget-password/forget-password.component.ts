import { Component } from '@angular/core';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  viewdata_email = 'Ingresa un correo electrónico';

  validForm: any;

  constructor() {
    this.InitialValidationForm();
  }

  SendEmail(dataForm) {

    this.InitialValidationForm();

    if (this.InvalidValidation(dataForm.value)) { 
      
      if(this.CheckIsEmail(dataForm.value.email)){
        console.log('success')
      }else{
        this.validForm['email'] = true
        this.viewdata_email = 'Ingrese un correo electrónico válido.'
      }

    }

  }

  CheckIsEmail(value)  {
    const regExpressionEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!regExpressionEmail.test(value))
      return false

    return true
  }

  InitialValidationForm() {
    this.validForm = {
      email: false
    }
  }

  Change(event, value, type) {
    this.validForm[type] = value.length == 0 ? true : false;
  }

  InvalidValidation(json) {

    let flag = true;

    for (let key in json) {
      if (json[key] === "") {
        this.validForm[key] = true;
        flag = false;
      }
    }

    return flag;

  }

}
