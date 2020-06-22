import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  toggled: boolean = false;
  user: string;
  room: string;
  messageText: string = '';
  messageArray: Array<{ user: string, message: string }> = [];

  constructor(private router: Router, private chatService: ChatService) {

    this.chatService.getUserNameObserver().subscribe(name => {
      this.user = name;
    });

    this.chatService.getRoomNameObserver().subscribe(name => {
      this.room = name;
    });

    this.chatService.newUserJoined()
      .subscribe(data => {
        this.messageArray.push(data);
        setTimeout(this.updateScroll, 0);
      });

    this.chatService.userLeftRoom()
      .subscribe(data => {
        this.messageArray.push(data);
        setTimeout(this.updateScroll, 0);
      });

    this.chatService.newMessageReceived()
      .subscribe(data => {
        this.messageArray.push(data);
        setTimeout(this.updateScroll, 0);
      });
  }

  ngOnInit() {
    this.chatService.joinRoom({ user: this.user, room: this.room });
  }

  updateScroll() {
    var element = document.getElementById("chatbox");
    element.scrollTop = element.scrollHeight;
  }

  handleSelection(event) {
    this.messageText += `${event.char} `;
    this.toggled = !this.toggled;
  }

  leave() {
    this.router.navigate(['/joinroom']);
    localStorage.removeItem('roomName');
    this.chatService.setRoomNameObserver('undefined');
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    if (this.messageText !== '') {
      this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
      this.messageText = '';
    }
  }
}
