import { Action } from '@ngrx/store'

export enum ActionsType {
 ADD_COMMENT = "[comment] ADD_COMMENT"
}

export class _AddComment implements Action{
  readonly type = ActionsType.ADD_COMMENT
  constructor(public payload: any){}
}

export type actions = _AddComment