import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

import * as AOS from 'aos';
import { Router } from '@angular/router';
import { Store } from '../../node_modules/@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: any;

  constructor(
    public socketservice: SocketService,
    public iziToast: Ng2IzitoastService,
    public router: Router,
    private store: Store<any>
  ) {
  }

  RedirectInit(user) {
    if (user == null)
      this.router.navigate(['/login'])
    else
      this.router.navigate(['/home'])
  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    AOS.init();
    this.AllEvents();

  }

  IziToast(user, avatar, msj, bColor) {

    this.iziToast.show({
      id: 'haduken',
      theme: 'dark',
      title: user,
      message: msj,
      position: 'bottomLeft',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      progressBarColor: 'rgb(0, 255, 184)',
      image: avatar,
      imageWidth: 70,
      layout: 2,
      backgroundColor: bColor,
      onClosing: function () {
        console.info('onClosing');
      },
      onClosed: function (instance, toast, closedBy) {
        console.info('Closed | closedBy: ' + closedBy);
      }
    });

  }

  AllEvents() {

    
    this.socketservice.onSocket().subscribe(res => {

      switch (res.option) {

        case "follower": {

          if (res.data.followerId === this.user._id) {

            const user = {
              displayName: res.user.displayName,
              avatar: res.user.avatar
            }

            this.IziToast(
              user.displayName,
              user.avatar,
              'Te ha seguido.',
              '#0275D8'
            )

          }
          break;
        }

        case "like": {

          if (res.pubUserId === this.user._id) {

            if (res.data.userId === this.user._id) return;

            const user = {
              displayName: res.user.displayName,
              avatar: res.user.avatar
            }

            this.IziToast(
              user.displayName,
              user.avatar,
              'Te ha dado un like.',
              '#D9534F'
            )
          }
        }
      }
    })

  }

}
