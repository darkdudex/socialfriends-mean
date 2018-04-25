import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class PublicationService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public AddPublication(publication): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/publication`, publication, { headers: headers });
  }

  public GetPublicationByUserId(userId, page): Observable<any> {
    return this.http.get(`${this.url}/publication/${userId}?page=${page}`);
  }

  public FileUpleoad() {

  }

}