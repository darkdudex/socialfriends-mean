import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://192.168.1.66:3000';

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