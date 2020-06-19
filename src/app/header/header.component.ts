import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getIsLoggedInObserver().subscribe(response => {
      this.isLoggedIn = response;
    });
  }

  LogOut() {
    localStorage.removeItem('chatApp');
    this.userService.setIsLoggedInObserver(false);
    this.router.navigate(['/landing']);
  }
}
