import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalShow, ModalHide } from '../../../ngrx/actions/modal.actions';

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

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.visible ? this.display = this.Display('block') : this.display = this.Display('none');
  }

  Display(value): any{
    return {
      'display' : value
    }
  }

  ModalHide(){
    this.store.dispatch(new ModalHide());
  }

}