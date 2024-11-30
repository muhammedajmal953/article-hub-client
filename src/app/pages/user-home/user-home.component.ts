import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoggedInService } from '../../services/logged-in.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  isLoggeIn=false
  constructor(private _router: Router, private _loggedService:LoggedInService){}
  token=localStorage.getItem('user')
  showmenu = false


  ngOnInit() {
    this._loggedService.loggedIn.subscribe((state) => {
      console.log('maeidkeidd',state);

      this.isLoggeIn=state
    })
    if (this.token) {
      this.isLoggeIn=true
    }
  }

  logout() {
    localStorage.removeItem('user')
    this.token=''
    this._loggedService.logout()
    this._router.navigate(['/'])
  }

  login() {
    this._router.navigate(['/'])
  }
}
