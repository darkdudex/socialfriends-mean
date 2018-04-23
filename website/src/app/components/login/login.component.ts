import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public msg_Notification: string;
  public ind_Notication: number;
  public sta_Notication: boolean;

  constructor(private userService: UserService, private loginService: LoginService, private route: Router) { 
  }

  ngOnInit() {
  }

  NotificationHandle(msg_Notification: string,ind_Notication: number,sta_Notication: boolean){
    this.msg_Notification = msg_Notification;
    this.ind_Notication = ind_Notication;
    this.sta_Notication = sta_Notication;
  }

  Login(dataForm){
    const account_and_password = dataForm.value
    this.loginService.Login(account_and_password).subscribe(res => {

      if (res.token != undefined || res.token != null){
        localStorage.setItem('userToken', res.token)
        localStorage.setItem('userInfo', JSON.stringify(res.user))
        this.route.navigate(['home'])
      }

      this.NotificationHandle("Verifica tu cuenta en el link que te enviamos por correo electrónico",1,true);

    }, err => {
      this.NotificationHandle("Verifique los datos ingresados",2,true);
    })   
  }

}
