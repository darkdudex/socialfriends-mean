import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class CommentService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public AddComment(comment): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/comment`, comment, { headers: headers });
  }

  public GetCommentByPublicationId(publicationId): Observable<any> {
    return this.http.get(`${this.url}/publication/${publicationId}`);
  }

}