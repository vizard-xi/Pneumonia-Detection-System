import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../utils/classes/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hidePassword: boolean = true;
  signUpForm: Signup;

  signUpInputForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  });



  constructor(private router: Router) {
    this.signUpForm = new Signup();
   }

  ngOnInit(): void {

  }

  passwordMatchValidator(signUpInputForm: FormGroup) {
    return signUpInputForm.get('password')?.value === signUpInputForm.get('passwordConfirm')?.value
       ? null : {'mismatch': true};
  }

  getEmailErrorMessage() {
    if (this.signUpInputForm.get('email')?.hasError('required')) {
      return 'Enter Email';
    }

    return this.signUpInputForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.signUpInputForm.get('password')?.hasError('required')) {
      return 'Enter Password';
    }

    return this.signUpInputForm.get('password')?.hasError('password') ? 'Password Less than 5' : '';
  }

  cancelSignUp(){
    this.router.navigate(['/login']);
  }

  loadSignUp(){
    this.router.navigate(['/login']);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signUpInputForm.value);
  }

}
