import { Action } from '@ngrx/store';

export enum ActionsType {

  LOGIN_USER = '[login] LOGIN_USER',
  REGISTER_USER = '[login] REGISTER_USER'
}

export class LoginUser implements Action {
  readonly type = ActionsType.LOGIN_USER;
  constructor(public payload: any) { }
}

export class RegisterUser implements Action {
  readonly type = ActionsType.REGISTER_USER;
  constructor(public payload: any) { }
}

export type actions = 
  | LoginUser
  | RegisterUser; 