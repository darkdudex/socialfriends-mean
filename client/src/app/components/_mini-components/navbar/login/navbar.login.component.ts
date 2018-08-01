import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarLoginComponentLabel } from './navbar.login.label';

@Component({
  selector: 'navbar-login',
  templateUrl: 'navbar.login.component.html',
  styleUrls: ['navbar.login.component.scss']
})

export class NavbarLoginComponent implements OnInit {
  
  public label = NavbarLoginComponentLabel.Spanish

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    const language = localStorage.getItem('language')

    switch(language){
      case 'spanish':
        this.label = NavbarLoginComponentLabel.Spanish;
        break;
      case 'english':
        this.label = NavbarLoginComponentLabel.English;
        break;
    }
  }

  Language(opc){
    localStorage.setItem('language', opc);
  }

}