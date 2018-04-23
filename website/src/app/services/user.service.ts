import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public url: string = "http://192.168.1.67:3000/api";

  constructor(private http: HttpClient) {

  }

  public GetToken(username): Observable<any> {
    return this.http.get(`${this.url}/token?username=${username}`);
  }

  public GetUser(page): Observable<any> {
    return this.http.get(`${this.url}/user?page=${page}`);
  }

}