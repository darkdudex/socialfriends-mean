import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class UserService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public GetToken(username): Observable<any> {
    return this.http.get(`${this.url}/token?username=${username}`);
  }

  public GetUser(page): Observable<any> {
    return this.http.get(`${this.url}/user?page=${page}`);
  }

  public GetUserById(userId): Observable<any> {
    return this.http.get(`${this.url}/user/${userId}`);
  }

}