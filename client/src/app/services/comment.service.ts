import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class CommentService {

  public url: string = config.url;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
  }

  public AddComment(comment): Observable<any> {
    return this.http.post(`${this.url}/comment`, comment, { headers: this.headers });
  }

  public GetCommentByPublicationId(page = 0, publicationId): Observable<any> {
    return this.http.get(`${this.url}/comment/${publicationId}?page=${page}`, { headers: this.headers });
  }

}