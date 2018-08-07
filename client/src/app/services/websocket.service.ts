import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { config } from '../app.config';

const SERVER_URL = config.url.replace('/api', '');

@Injectable()
export class WebSocketService {

  private socket;

  constructor(){
    this.socket = io(SERVER_URL);
  }

  public AddFollower(data, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, user, option: 'follower' });
  }

  public AddLike(data, pubUserId, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, pubUserId, user, option: 'like' });
  }

  public AddComment(data, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, user, option: 'comment' });
  }

  public OnResponse(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('ALL_NOTIFICATIONS', (data) => observer.next(data));
    });
  }

}