import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  loggedSubject = new BehaviorSubject<boolean>(false)

  loggedIn=this.loggedSubject.asObservable()
  constructor() { }


  login() {
    this.loggedSubject.next(true)
  }
  logout() {
    this.loggedSubject.next(true)
  }


  isLoggedIn() {
    return this.loggedSubject.value
  }
}
