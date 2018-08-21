import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';


@Injectable()
export class LikeService {

  private url: string = config.url;
  private headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token')
    
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);

  }

  public AddLike(data): Observable<any> {
    return this.http.post(`${this.url}/like`, data, { headers: this.headers });
  }

  public RemoveLike(data): Observable<any> {
    return this.http.post(`${this.url}/unlike`, data, { headers: this.headers });
  }

  public GetLikeByPublicationId(publicationId, /* page */): Observable<any> {
    return this.http.get(`${this.url}/like/${publicationId}`, { headers: this.headers });
  }


}