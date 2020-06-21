import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ChatService } from '../Services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isRoomJoined: boolean = false;
  constructor(private router: Router, private chatService: ChatService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getIsLoggedInObserver().subscribe(response => {
      this.isLoggedIn = response;
    });

    this.chatService.getRoomNameObserver().subscribe(response =>{
      if(response !== null){
        this.isRoomJoined = true;
      }
    })
  }

  LogOut() {
    localStorage.removeItem('chatApp');
    localStorage.removeItem('userName');
    localStorage.removeItem('roomName');
    this.userService.setIsLoggedInObserver(false);
    this.router.navigate(['/landing']);
  }
}
