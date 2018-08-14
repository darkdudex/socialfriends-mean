import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FollowerService } from '../../services/follower.service';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../services/notification.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss']
})

export class UserListComponent implements OnInit {

  public followerList: Array<any> = []
  public listUsers: Array<any> = []
  public user: any = {}
  public page = 1;
  public finished: boolean = true;
  public UserFind: string

  //HTMLElement 
  public elem: HTMLElement

  constructor(
    private userService: UserService,
    private followerService: FollowerService,
    private notificationService: NotificationService,
    public socketservice: SocketService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.GetUser();
    this.GetFollowerByUserId(this.user._id)
  }

  UserFindByDisplayName(event: any) {
    this.page = 1
    this.listUsers = []
    this.GetUser()
  }

  onScroll() {
    this.page++;
    this.GetUser();
  }

  public GetUser() {
    this.userService.GetUser(this.page, this.UserFind).subscribe(
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

  public async Follow(userId, followerId) {
    const data = { userId, followerId }
    this.followerService.AddFollower(data).subscribe(
      res => {
        this.socketservice.AddFollower(res, this.user)
        this.AddNotification(
          followerId,
          `@${this.user.username} ha comenzado a seguirte`)
      },
      err => {
        console.log(err)
      })
  }

  public AddNotification(toUserId, message) {
    return this.notificationService.AddNotification({
      description: message,
      userFromNotification: this.user._id,
      userToNotification: toUserId
    })
  }

  public UnFollower(userId, followerId) {
    const data = { userId, followerId }
    this.followerService.RemoveFollower(data).subscribe(
      res => {

      },
      err => {
        console.log(err)
      })
  }

  public GetFollowerByUserId(userid) {
    this.followerService.GetFollowerByUserId(userid).subscribe(res => {
      this.followerList = res.response;
    }, err => {

    })
  }

  validate(userId) {
    const x = this.followerList.filter(item => item.followerId._id == userId)
    return x.length > 0 ? true : false
  }

  public Follow_And_UnFollow(followerId) {

    let x = document.getElementById(followerId)

    if (x.className.includes('btn-primary')) {
      x.className = 'btn btn-danger btn-sm'
      x.innerHTML = x.innerHTML.replace('Seguir', 'Dejar de seguir');
      this.Follow(this.user._id, followerId)
    } else {
      x.className = 'btn btn-primary btn-sm'
      x.innerHTML = x.innerHTML.replace('Dejar de seguir', 'Seguir');
      this.UnFollower(this.user._id, followerId)
    }

  }


}