import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.scss']
})

export class NotificationComponent implements OnInit {

  notificationList: Array<any> = [];
  user: any = {}

  constructor(
    private notificationService: NotificationService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {

    this.notificationService.GetNotificationByUserId(this.user._id).subscribe(res => {
      this.notificationList = res.notifications
      console.log(this.notificationList)
    },
      err => {
        console.log(err)
      })
  }

}