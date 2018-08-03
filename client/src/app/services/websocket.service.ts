import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { config } from '../app.config';

const SERVER_URL = config.url.replace('/api','');

@Injectable()
export class WebSocketService {
  private socket;

  public InitSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public AddFollower(data, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, user, option: 'follower' });
  }

  public AddLike(data, user): void {
    this.socket.emit('ALL_NOTIFICATIONS', { data, user, option: 'like' });
  }

  public OnResponse(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('ALL_NOTIFICATIONS', (data) => observer.next(data));
    });
  }

}