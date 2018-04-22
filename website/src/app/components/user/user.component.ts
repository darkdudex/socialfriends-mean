import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public listUsers: Array<any> = []
  public user = {}
  public counter = 1;
  public finished: boolean = true;

  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit() {
    this.GetUser(this.listUsers, this.counter)
  }

  onScroll() {
    this.counter++;
    this.GetUser(this.listUsers, this.counter);
  }

  public GetUser(listUsers: Array<any>, counter: number) {
    this.userService.GetUser(this.counter).subscribe(res => {

      if(res.users.length != 6)
        this.finished = false

      if (this.listUsers.length == 0) {
        this.listUsers = res.users;
      } else {
        res.users.map(item => {
          this.listUsers.push(item);
        })
      }

    }, err => {
      console.log(err)
    })
  }

}
