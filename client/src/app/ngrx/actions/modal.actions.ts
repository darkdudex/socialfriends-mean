import { Action } from '@ngrx/store';

export enum ActionsType {

  MODAL_SHOW = '[modal] MODAL_SHOW',
  MODAL_HIDE = '[modal] MODAL_HIDE'

}

export class ModalShow implements Action {
  readonly type = ActionsType.MODAL_SHOW;
  constructor(public payload: any) { }
}

export class ModalHide implements Action {
  readonly type = ActionsType.MODAL_HIDE;
}

export type actions = 
  | ModalShow
  | ModalHide; 


