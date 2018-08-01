import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';
import { User } from '../models/user.model';

@Injectable()
export class GroupService {

  public url: string = config.url;
  public headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
  }

  public AddGroup(data): Observable<any> {
    return this.http.post(`${this.url}/group`, data, { headers: this.headers });
  }

  public GetGroup(page?: number): Observable<any> {
    return this.http.get<User>(`${this.url}/group?page=${page}`, { headers: this.headers });
  }

}