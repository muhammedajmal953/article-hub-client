import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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
export class UserHomeComponent {
  constructor(private _router:Router){}
  token=localStorage.getItem('user')
  showmenu = false

  logout() {
    localStorage.removeItem('user')
    this.token=''
    this._router.navigate(['/'])
  }

  login() {
    this._router.navigate(['/'])
  }
}
