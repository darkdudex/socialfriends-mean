import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { Ng2IzitoastService } from 'ng2-izitoast';

import * as AOS from 'aos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: any;

  constructor(
    private socketService: WebSocketService,
    public iziToast: Ng2IzitoastService,
    public router: Router
  ) {
    this.InitSocketConnection();
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.RedirectInit(this.user)
  }

  RedirectInit(user) {
    if (user == null)
      this.router.navigate(['/login'])
    else
      this.router.navigate(['/home'])
  }

  ngOnInit() {
    AOS.init();

    this.socketService.OnResponse().subscribe(res => {

      if (res.data.followerId === this.user._id) {

        this.iziToast.show({
          id: 'haduken',
          theme: 'dark',
          title: res.user.displayName,
          message: 'Te ha seguido.',
          position: 'bottomLeft',
          transitionIn: 'flipInX',
          transitionOut: 'flipOutX',
          progressBarColor: 'rgb(0, 255, 184)',
          image: res.user.avatar,
          imageWidth: 70,
          layout: 2,
          backgroundColor: '#0275D8',
          onClosing: function () {
            console.info('onClosing');
          },
          onClosed: function (instance, toast, closedBy) {
            console.info('Closed | closedBy: ' + closedBy);
          }
        });


      }
    })
  }

  InitSocketConnection() {
    this.socketService.InitSocket();
  }

}
