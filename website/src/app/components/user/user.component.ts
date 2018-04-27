import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FollowerService } from '../../services/follower.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public listUsers: Array<any> = []
  public user = {}
  public page = 1;
  public finished: boolean = true;

  constructor(private userService: UserService, private followerService: FollowerService) {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit() {
    this.GetUser()
  }

  onScroll() {
    this.page++;
    this.GetUser();
  }

  public GetUser() {
    this.userService.GetUser(this.page).subscribe(
      res => {

        if (res.users.length != 6)
          this.finished = false

        if (this.listUsers.length == 0) {
          this.listUsers = res.users;

        } else {
          res.users.map(item => {
            this.listUsers.push(item);
          })
        }

      },
      err => {
        console.log(err)
      })
  }

  public AddFollower(userId, followerId) {
    const data = { userId, followerId }
    this.followerService.AddFollower(data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }

}
