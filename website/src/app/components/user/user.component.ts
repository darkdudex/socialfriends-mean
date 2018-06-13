import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FollowerService } from '../../services/follower.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public listUsers: Array<any> = []
  public user:any = {}
  public page = 1;
  public finished: boolean = true;
  public UserFind: string

  //HTMLElement 
  public elem: HTMLElement

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

  public Follow(userId, followerId) {
    const data = { userId, followerId }
    this.followerService.AddFollower(data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }

  public UnFollower(userId, followerId) {
    const data = { userId, followerId }
    this.followerService.RemoveFollower(data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }


  public Follow_And_UnFollow(followerId) {

    let x = document.getElementById(followerId)

    if (x.innerHTML.includes('fa fa-plus-circle')) {
      x.className = 'btn btn-danger btn-sm'
      x.innerHTML = '<i class="fa fa-minus-circle" aria-hidden="true"></i> Dejar de seguir'
      this.Follow(this.user._id, followerId)
    } else {
      x.className = 'btn btn-primary btn-sm'
      x.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i> Seguir'
      this.UnFollower(this.user._id, followerId)
    }

  }



}
