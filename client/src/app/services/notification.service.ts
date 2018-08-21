import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';
import { User } from '../models/user.model';

@Injectable()
export class NotificationService {

  private url: string = config.url;
  private headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token')
    
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);

  }

  public AddNotification(data): Promise<any> {
    return this.http.post(`${this.url}/notification`, data, { headers: this.headers })
      .toPromise();
  }

  public GetNotificationByUserId(userId): Observable<any> {
    return this.http.get(`${this.url}/notification/${userId}`, { headers: this.headers })
  }

}