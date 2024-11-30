import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { LoggedInService } from '../../services/logged-in.service';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(private _router: Router,private _userService:UserService,private _loggedInServices:LoggedInService) {

  }

  register() {
    this._router.navigate(['/register'])
  }

  onLogin(event: any) {
    this._userService.login(event).subscribe({
      next: (res:any) => {
        if (res?.success) {
          Swal.fire({
            text: res.message,
            toast: true,
            showConfirmButton: false,
            icon: 'success',
            timer:1500,
            position:'top'
          })
          localStorage.setItem('user', res.data)
          this._loggedInServices.login()
          this._router.navigate(['/feed'])
        }
      },
      error: (error) => {
        Swal.fire({
          text: error.error.message,
          toast: true,
          showConfirmButton: false,
          timer:1500,
          icon: 'error',
        })
      }
    })
  }
}
