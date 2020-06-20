import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { ISignupModel } from '../Models/models';
import { ToastrService } from 'ngx-toastr';
import {ISignUpResponse} from '../Models/models'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isSignupError: boolean = false;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  signup(formValue: ISignupModel) {
    this.userService.userSignUp(formValue).subscribe((res: ISignUpResponse) => {
      this.router.navigate(['/landing']);
      this.toastr.info('Please check your mail-box for confirm mail!');
    });
  }

}
