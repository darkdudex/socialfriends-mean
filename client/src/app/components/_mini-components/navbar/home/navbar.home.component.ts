import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-home',
  templateUrl: 'navbar.home.component.html',
  styleUrls: ['navbar.home.component.scss']
})

export class NavbarHomeComponent implements OnInit {

  user: any;

  constructor(
    private route: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() { }

  ShowDropdown() {
    document.getElementById('dropdown-info-user')
      .classList.toggle('show')
  }

  ShowItemsNav() {
    document.getElementById('navbar')
      .classList.toggle('show')
  }

  SignOut(){
    this.route.navigate(['/login'])
    localStorage.removeItem('user')
  }

}