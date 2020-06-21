import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  userName: string;
  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUserNameObserver().subscribe(name => {
      this.userName = name;
    });
  }

  join(formValue) {
    this.chatService.setRoomNameObserver(formValue.roomName);
    this.chatService.joinRoom({ user: this.userName, room: formValue.roomName });
    this.router.navigate(['/room']);
  }

}
