import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class FileService {

  public url: string = config.url;
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));
  }

  public AddFile(files: Array<File>, userId, folderName) {

    const formData: any = new FormData();

    formData.append("userId", userId);
    formData.append("folderName", folderName);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i]['name']);
    }

    return this.http.post(`${this.url}/fileupload`, formData, { headers: this.headers });
  }

}