import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  public url: string = config.url;
  public headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));

  }

  public GetToken(username): Observable<any> {
    return this.http.get(`${this.url}/token?username=${username}`, { headers: this.headers });
  }

  public GetUser(page = 0, displayname = ""): Observable<any> {
    return this.http.get<User>(`${this.url}/user?page=${page}&displayname=${displayname}`, { headers: this.headers });
  }

  public GetUserById(userId): Observable<any> {
    return this.http.get<User>(`${this.url}/user/${userId}`, { headers: this.headers });
  }

}