import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../app.config';

const SERVER_URL = config.url.replace('/api', '');
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private url = SERVER_URL;  
  
  private socket;
  constructor(private http: HttpClient) { }
  
  emitSocket(data){
    this.socket = io(this.url);
    this.socket.emit('tpa_socket', data);    
  }
  
  onSocket(): Observable<any> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('ALL_NOTIFICATIONS', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
  } 

  public AddFollower(data, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, user, option: 'follower' });
  }

  public AddLike(data, pubUserId, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, pubUserId, user, option: 'like' });
  }

  public RemoveLike(data, pubUserId, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, pubUserId, user, option: 'dislike' });
  }

  public AddComment(data, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, user, option: 'comment' });
  }

}
