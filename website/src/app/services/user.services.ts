import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public url:string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }
  
  public GetUser():Observable<any>{
    return this.http.get(`${this.url}/user`);
  }

}