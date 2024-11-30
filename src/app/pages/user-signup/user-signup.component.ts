import { Component } from '@angular/core';
import { SignupComponent } from "../../components/signup/signup.component";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { LoggedInService } from '../../services/logged-in.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [SignupComponent],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  constructor(private _router: Router,private _userService:UserService,private _loggedInService:LoggedInService) { }

  login() {
    this._router.navigate(['/'])
  }

  onSignUp(formData:any) {
    this._userService.register(formData).subscribe({
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
          this._loggedInService.login()
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
