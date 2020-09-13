import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()

export class ChatService {

  private userName$ = new BehaviorSubject<string>(this.userNameSubsrcriptionDefaultValue());

  userNameSubsrcriptionDefaultValue(): string {
    return localStorage.getItem('userName');
  }

  private roomName$ = new BehaviorSubject<string>(this.roomNameSubsrcriptionDefaultValue());

  roomNameSubsrcriptionDefaultValue(): string {
    return localStorage.getItem('roomName');
  }

  private socket = io(environment.baseUrl);

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  public setUserNameObserver(name: string) {
    this.userName$.next(name);
  }

  public getUserNameObserver(): Observable<string> {
    return this.userName$.asObservable();
  }

  public setRoomNameObserver(name: string) {
    localStorage.setItem('roomName', name);
    this.roomName$.next(name);
  }

  public getRoomNameObserver(): Observable<string> {
    return this.roomName$.asObservable();
  }

  newUserJoined() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: string, message: string }>(obs => {
      this.socket.on('left room', (data) => {
        obs.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: string, message: string }>(obs1 => {
      this.socket.on('new message', (data) => {
        obs1.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }
}