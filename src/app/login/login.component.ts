import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../utils/classes/Login/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  loginForm: Login;

  loginInputForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private router: Router) {
    this.loginForm = new Login();
   }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.loginInputForm.get('email')?.hasError('required')) {
      return 'Enter Email';
    }

    return this.loginInputForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginInputForm.get('password')?.hasError('required')) {
      return 'Enter Password';
    }

    return this.loginInputForm.get('password')?.hasError('password') ? 'Password Less than 5' : '';
  }

  loadSignUpPage(){
    this.router.navigate(['/signup']);
  }

  loadDashboard(){
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginInputForm.value);
  }

}
