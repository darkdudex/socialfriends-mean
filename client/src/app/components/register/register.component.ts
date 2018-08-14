import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validForm: any;
  viewdata_password = 'Ingresa una contraseña';
  viewdata_username = 'Ingresa un nombre de usuario';
  viewdata_email = 'Ingresa un correo electrónico';

  constructor(private userService: UserService, private loginService: LoginService) {
    this.InitialValidationForm();
  }

  ngOnInit() { }

  Register(dataForm) {

    if (this.InvalidValidation(dataForm.value)) {

      let user = dataForm.value;

      if (dataForm.value.password !== dataForm.value.verificationPassword) {
        this.validForm['password'] = true
        this.validForm['verificationPassword'] = true
        this.viewdata_password = 'Las contraseñas no coinciden.'
        return;
      }

      user.providerId = 'email.com';
      user.avatar = 'https://image.ibb.co/dw49o9/user_2517433_640.png';

      this.loginService.RegisterUser(user).subscribe(res => {

        if (res.email) {
          this.validForm['email'] = true
          this.viewdata_email = 'Este correo electrónico ya existe.'
        }

        if (res.username) {
          this.validForm['username'] = true
          this.viewdata_username = 'Este usuario ya existe.'
        }

        if (res.success){
          document.getElementById('showNotification').click()
          dataForm.reset();
        }

      }, err => {
        console.error(err)
      });

    }
  }

  InitialValidationForm() {
    this.validForm = {
      verificationPassword: false,
      displayName: false,
      email: false,
      password: false,
      username: false
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
