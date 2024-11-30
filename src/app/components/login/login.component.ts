import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() register = new EventEmitter()
  @Output() sendForm = new EventEmitter()

  formData!:FormGroup
  constructor() {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$')]),
    })
  }

  gotoRegister() {
    this.register.emit()
  }

  onSubmit() {
    console.log('clicked');

    if (this.formData.valid) {
      this.sendForm.emit(this.formData.value)
    }
    this.formData.markAllAsTouched()
  }


}
