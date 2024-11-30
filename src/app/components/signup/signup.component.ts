import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formData!: FormGroup
  constructor() {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$')]),
      username: new FormControl('', [Validators.required, Validators.pattern('^(?!.*[._]{2})[A-Za-z][A-Za-z0-9._]{1,}[A-Za-z0-9]$')]),
      confirmPassword: new FormControl('', [Validators.required])
    }
    )
  }
  @Output() sendData=new EventEmitter()
  @Output() gotologin = new EventEmitter()
  gotoLogin() {
    this.gotologin.emit()
  }

  PasswordMatchValidators(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value
    const confirmPassword = group.get('consfirmPassword')?.value

    return password!=confirmPassword?null:{passwordMismatch:true}
  }

  onSubmit(event: any) {
    event.preventDefault()
    const password = this.formData.get('password')?.value
    const confirmPassword = this.formData.get('confirmPassword')?.value
    if (this.formData.valid && password === confirmPassword) {
      console.log(this.formData.value);

      this.sendData.emit(this.formData.value)
    }
    this.formData.markAllAsTouched()
  }

}
