import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';
import { User } from '../models/user.model';

@Injectable()
export class NotificationService {

  public url: string = config.url;
  public headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
  }

  public AddNotification(data): Promise<any> {
    return this.http.post(`${this.url}/notification`, data, { headers: this.headers })
      .toPromise();
  }

  public GetNotificationByUserId(userId): Observable<any> {
    return this.http.get(`${this.url}/notification/${userId}`, { headers: this.headers })
  }

}