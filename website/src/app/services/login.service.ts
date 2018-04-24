import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class LoginService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public Login(account_and_password): Observable<any>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/signin`, account_and_password, { headers: headers });
  }

  public RegisterUser(user): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/signup`, user, { headers: headers });
  }

}