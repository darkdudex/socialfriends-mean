import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user = {};

  constructor(private route: Router) { 
    
    // Test - Temporal//
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    if (this.user == null) 
      this.route.navigate(['/']);
    
  }
  
  ngOnInit() {

  }

  SignOut(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userInfo')
    this.route.navigate(['/'])
  }

}
