import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Register(dataForm) {
    
    console.log(dataForm.value);

    if (dataForm.value.email != dataForm.value.Verificationemail ||
      dataForm.value.password != dataForm.value.Verificationpassword)
      return;

    dataForm.reset();
  }

}
