import { Component } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  user: string;
  room: string;
  messageText: string;
  messageArray: Array<{ user: string, message: string }> = [];

  constructor(private router: Router, private chatService: ChatService) {

    this.chatService.getUserNameObserver().subscribe(name => {
      this.user = name;
    });

    this.chatService.getRoomNameObserver().subscribe(name => {
      this.room = name;
    });

    this.chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this.chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  leave() {
    this.router.navigate(['/joinroom']);
    localStorage.removeItem('roomName');
    this.chatService.setRoomNameObserver('undefined');
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    this.messageText = '';
  }
}
