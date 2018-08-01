import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';

import { ActionsType } from '../actions/login.actions';

@Injectable()
export class LoginEffects {

    constructor(
        private actions$: Actions,
        private loginService: LoginService
    ) { }

    @Effect()
    HelloWorld$: Observable<Action> = this.actions$.pipe(
        ofType<any>(ActionsType.LOGIN_USER),
        concatMap(action =>
            this.loginService.Login(action.account_and_password)
                .pipe(
                    map(data => new data),
                    catchError(error => of(new error)
                )
        )
    ));



}