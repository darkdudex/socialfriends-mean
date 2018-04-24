import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { config } from '../../config';

@Injectable()
export class FileService {

  public url: string = config.url;

  constructor(private http: HttpClient) {

  }

  public AddFile(files: Array<File>) {

    const formData:any = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i]['name']);
    }

    return this.http.post(`${this.url}/fileupload`, formData)
  }

}