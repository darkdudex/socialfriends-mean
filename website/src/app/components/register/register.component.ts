import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit() {
    
  }

  Register(dataForm) {

    let user = dataForm.value;

    if (user.email != user.Verificationemail || user.password != user.Verificationpassword)
      return;

    user.providerId = 'email.com';
    user.avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    delete user.Verificationemail;
    delete user.Verificationpassword;

    this.loginService.RegisterUser(user).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err.error)
    });

    dataForm.reset();
  }

}
