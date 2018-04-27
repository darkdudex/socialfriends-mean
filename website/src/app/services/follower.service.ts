import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class FollowerService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public AddFollower(publication): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/follower`, publication, { headers: headers });
  }

  public GetFollowerByUserId(userId, page): Observable<any> {
    return this.http.get(`${this.url}/follower/${userId}?page=${page}`);
  }

  public FileUpleoad() {

  }

}