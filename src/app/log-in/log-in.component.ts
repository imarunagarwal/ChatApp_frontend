import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { NgForm } from '@angular/forms';
import { IResponse } from '../Models/models';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from '../Services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  email: string = '';
  password: string = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private router: Router, private chatService: ChatService, private toastr: ToastrService, private userService: UserService) { }

  login(form: NgForm) {
    this.userService.userLogin(form.value).subscribe((data: IResponse)=>{
      localStorage.setItem('chatApp', data.token);
      localStorage.setItem('userName', data.userName);
      this.chatService.setUserNameObserver(data.userName);
        this.userService.setIsLoggedInObserver(true);
        this.router.navigateByUrl('/joinroom');
        this.toastr.success('Logged in successfully', 'Success');
    },
    (err:HttpErrorResponse) =>{
      if(err.status === 401){
        this.toastr.error('Unauthorized Access.');
      }
      else{
        this.toastr.error('Error Occured.');
      }
    });
  }
}
