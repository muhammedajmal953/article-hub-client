import { Component } from '@angular/core';
import { SignupComponent } from "../../components/signup/signup.component";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [SignupComponent],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  constructor(private _router: Router,private _userService:UserService) { }

  login() {
    console.log('clicked');

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
