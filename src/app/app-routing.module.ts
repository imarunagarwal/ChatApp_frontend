import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { LandingComponent } from './landing/landing.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { AuthGuard } from './Guards/auth.guard';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
  {
    path: 'signup', component: SignUpComponent,
  },
  {
    path: 'login', component: LogInComponent,
  },
  {
    path: 'joinroom', component: JoinRoomComponent, canActivate: [AuthGuard]
  },
  {
    path: 'room', component: RoomComponent, canActivate: [AuthGuard]
  },
  {
    path: 'landing', component: LandingComponent,
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
