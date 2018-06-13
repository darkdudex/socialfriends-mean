import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class LikeService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public AddLike(data): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/like`, data, { headers: headers });
  }

  public RemoveLike(data): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/unlike`, data, { headers: headers });
  }

  public GetLikeByPublicationId(publicationId, /* page */ ): Observable<any> {
    return this.http.get(`${this.url}/like/${publicationId}`); //?page=${page}
  }


}