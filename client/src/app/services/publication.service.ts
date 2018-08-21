import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class PublicationService {

  private url: string = config.url;
  private headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token')
    
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);

  }

  public AddPublication(publication): Observable<any> {
    return this.http.post(`${this.url}/publication`, publication, { headers: this.headers });
  }

  public GetPublicationByUserId(userId, page = 0): Observable<any> {
    return this.http.get(`${this.url}/publication/${userId}?page=${page}`, { headers: this.headers });
  }

  public GetPublicationFollowersByUserId(userId, page = 0): Observable<any> {
    return this.http.get(`${this.url}/publication/followers/${userId}?page=${page}`, { headers: this.headers });
  }

  public DeletePublication(publicationId): Observable<any> {
    return this.http.delete(`${this.url}/publication/${publicationId}`, { headers: this.headers });
  }

}