import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss']
})

export class ModalComponent implements OnInit {

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