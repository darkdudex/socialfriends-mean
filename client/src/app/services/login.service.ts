import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class LoginService {

  private url: string = config.url;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

  }

  public Login(account_and_password): Observable<any>  {
    return this.http.post(`${this.url}/signin`, account_and_password, { headers: this.headers });
  }

  public RegisterUser(user): Observable<any> {
    return this.http.post(`${this.url}/signup`, user, { headers: this.headers });
  }

}