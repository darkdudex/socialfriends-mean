import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public url: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) {

  }

  public GetToken(username): Observable<any> {
    return this.http.get(`${this.url}/token?username=${username}`);
  }

  public GetUser(): Observable<any> {
    return this.http.get(`${this.url}/user`);
  }

  public RegisterUser(user): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/user/signup`, user, { headers: headers });
  }

}