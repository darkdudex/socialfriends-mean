import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class PublicationService {

  public url: string = config.url;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
  }

  public AddPublication(publication): Observable<any> {
    return this.http.post(`${this.url}/publication`, publication, { headers: this.headers });
  }

  public GetPublicationByUserId(userId, page): Observable<any> {
    return this.http.get(`${this.url}/publication/${userId}?page=${page}`, { headers: this.headers });
  }

  public GetPublicationFollowersByUserId(userId, page): Observable<any> {
    return this.http.get(`${this.url}/publication/followers/${userId}?page=${page}`, { headers: this.headers });
  }

  public DeletePublication(publicationId): Observable<any> {
    return this.http.delete(`${this.url}/publication/${publicationId}`, { headers: this.headers });
  }

}