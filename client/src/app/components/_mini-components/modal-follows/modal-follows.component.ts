import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal-follows',
  templateUrl: 'modal-follows.component.html',
  styleUrls: ['modal-follows.component.scss']
})

export class ModalFollowsComponent implements OnInit {

  @Input() title:string;
  @Input() userlist: Array<any>;

  @Input() visible: boolean;
  display: string

  constructor() { }

  ngOnInit() {
    this.visible ? this.display = this.Display('block') : this.display = this.Display('none');
  }

  Display(value): any{
    return {
      'display' : value
    }
  }

}