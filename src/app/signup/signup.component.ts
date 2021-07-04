import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpRequestsService } from '../utils/http-requests/http-requests.service';
import { UserDetails } from '../utils/classes/SignUp/signup';
import { AccountCreationStatus } from '../utils/enums/account-creation-status.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  snackBarDurationInSeconds: number = 5;
  hidePassword: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  signUpForm: UserDetails;

  signUpInputForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });


  constructor(private router: Router, private _snackBar: MatSnackBar, private httpRequestsService: HttpRequestsService) {
    this.signUpForm = new UserDetails();
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

  createAccount(){
    this.httpRequestsService.postRequest('userDetails', this.signUpForm).subscribe((data: any) => {
      if(data == "OK") {
        this.openSnackBarForAccountCreation(AccountCreationStatus.Successful)
        this.router.navigate(['/login']);
      } else {
        this.openSnackBarForAccountCreation(AccountCreationStatus.Failed)
      }
    })
  }

  openSnackBarForAccountCreation(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.snackBarDurationInSeconds * 1000,
      panelClass: ["customStyleForSnackbar"]
    });
  }

}
