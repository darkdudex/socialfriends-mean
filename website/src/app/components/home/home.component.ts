import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.services';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user = {}

  constructor(private userService: UserService, private route: Router) { 
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit() {
  }

}
