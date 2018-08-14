import { Component, OnInit } from '@angular/core';
import { LoginComponentLabel } from './login.label';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../ngrx/actions/login.actions';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocialLoginService } from '../../services/social.login.service';
import { forEach } from '../../../../node_modules/@angular/router/src/utils/collection';

enum CodeResponse {
  CHECK_EMAIL = 30,
  NOT_FOUND = 25
}

interface LoginResponse {
  status: number;
  code: CodeResponse;
  message: string;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'app';
  label = LoginComponentLabel.Spanish
  statusLogin: LoginResponse;
  response: string;

  validForm: any;

  constructor(
    private store: Store<any>,
    private loginService: LoginService,
    private route: Router,
    private socialLogin: SocialLoginService
  ) {
    this.InitialValidationForm();
  }

  ngOnInit() {

    const language = localStorage.getItem('language')

    switch (language) {
      case 'spanish':
        this.label = LoginComponentLabel.Spanish;
        break;
      case 'english':
        this.label = LoginComponentLabel.English;
        break;
    }
  }

  InitialValidationForm() {
    this.validForm = {
      account: false,
      password: false
    }
  }

  Change(event,value,type){
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

  Login(dataForm) {

    this.InitialValidationForm();

    if (this.InvalidValidation(dataForm.value)) {

      const account_and_password = dataForm.value

      this.loginService.Login(account_and_password).subscribe(res => {

        if (res.token != undefined || res.token != null) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('user', JSON.stringify(res.user))
          window.location.href = '/home'
        }

        this.statusLogin = {
          status: res.status, code: res.code, message: 'Verifica tu cuenta mediante el link que te envíamos al correo electrónico.'
        }

      }, err => {
        this.statusLogin = {
          status: err.error.status, code: err.error.code, message: 'Usuario no encontrado'
        }
      })
    }
  }

  GoogleLogin() {
    this.socialLogin.GoogleLogin()
      .then(res => console.log(res.additionalUserInfo.profile))
      .catch(err => console.log(err))
  }

  FacebookLogin() {
    this.socialLogin.FacebookLogin()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  GitHubLogin() {
    this.socialLogin.GitHubLogin()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  TwitterLogin() {
    this.socialLogin.TwitterLogin()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }



}
