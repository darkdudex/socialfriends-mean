import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss']
})

export class ItemComponent implements OnInit {

  @Input() value: any;
  @Input() img: string;
  @Input() font: string;
  @Input() color: string;
  @Input() notification: string;

  public style: any;

  constructor() {

  }

  ngOnInit() {
    this.style = {
      'font-family': this.font,
      'color': this.color
    }
  }

}