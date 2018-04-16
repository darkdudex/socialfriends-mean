import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.services'

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService){
    
  }

  ngOnInit(){
    this.GetUser();
  }

  public GetUser(){
    this.userService.GetUser().subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }
  
}
