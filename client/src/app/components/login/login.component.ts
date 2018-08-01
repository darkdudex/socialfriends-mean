import { Component, OnInit } from '@angular/core';
import { LoginComponentLabel } from './login.label';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../ngrx/actions/login.actions';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

enum CodeResponse {
  CHECK_EMAIL = 30,
  NOT_FOUND =   25
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

  constructor(
    private store: Store<any>,
    private loginService: LoginService,
    private route: Router
  ) {
    
  }

  ngOnInit() {

    const language = localStorage.getItem('language')

    switch(language){
      case 'spanish':
        this.label = LoginComponentLabel.Spanish;
        break;
      case 'english':
        this.label = LoginComponentLabel.English;
        break;
    }
  }

  Login(dataForm) {
    const account_and_password = dataForm.value
    this.loginService.Login(account_and_password).subscribe(res => {

      if (res.token != undefined || res.token != null) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        this.route.navigate(['home'])
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
