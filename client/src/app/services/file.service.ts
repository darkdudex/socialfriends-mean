import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class FileService {

  private url: string = config.url;
  private headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token')
    
    this.headers = new HttpHeaders()
      .set('Authorization', this.token);

  }

  public AddFile(files: Array<File>, userId, folderName): Observable<any> {

    const formData: any = new FormData();

    formData.append("userId", userId);
    formData.append("folderName", folderName);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i]['name']);
    }

    return this.http.post(`${this.url}/fileupload`, formData, { headers: this.headers });
  }

}