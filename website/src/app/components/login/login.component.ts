import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  Login(dataForm){
    const account_and_password = dataForm.value
    this.userService.Login(account_and_password).subscribe(res => {

      if (res.token != undefined || res.token != null)
        this.route.navigate(['home'])

    }, err => {
      console.log(err.error)
    })   
  }

}
