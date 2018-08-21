import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class FollowerService {

  private url: string = config.url;
  private headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token')
    
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);

  }

  public AddFollower(data): Observable<any> {
    return this.http.post(`${this.url}/follow`, data, { headers: this.headers });
  }

  public RemoveFollower(data): Observable<any> {
    return this.http.post(`${this.url}/unfollow`, data, { headers: this.headers });
  }

  public GetFollowerByUserId(userId, page?): Observable<any> {
    return this.http.get(`${this.url}/follower/${userId}?page=${page}`, { headers: this.headers });
  }

  public GetFollowingByUserId(userId, page?): Observable<any> {
    return this.http.get(`${this.url}/following/${userId}?page=${page}`, { headers: this.headers });
  }

}