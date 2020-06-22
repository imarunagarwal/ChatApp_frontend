import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class UserService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.subsrcriptionDefaultValue());

  subsrcriptionDefaultValue(): boolean {
    if (localStorage.getItem('chatApp') === null) {
      return false;
    }
    else {
      return true;
    }
  }

  readonly rootUrl = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) { }

  public setIsLoggedInObserver(flag: boolean) {
    this.isLoggedIn$.next(flag);
  }

  public getIsLoggedInObserver(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }


  userSignUp(user) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl, user, { headers: reqHeader });
  }

  userLogin(user) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + 'login', user, { headers: reqHeader });
  }
}
