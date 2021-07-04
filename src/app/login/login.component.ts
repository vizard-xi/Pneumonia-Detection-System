import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../utils/classes/Login/login';
import { HttpRequestsService } from '../utils/http-requests/http-requests.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  loginForm: Login;
  snackBarDurationInSeconds: number = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  loginInputForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private router: Router, private httpRequestsService: HttpRequestsService,
    private _snackBar: MatSnackBar) {
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

  userLoginValidationSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.snackBarDurationInSeconds * 1000,
      panelClass: ["customStyleForSnackbar"]
    });
  }

  userLoginValidation(user: any, validationState: string){
    switch (validationState) {
      case "Valid Email & Password":
        this.loginForm.userID = user.id;
        this.loginForm.name = user.name;
        this.loginForm.phoneNumber = user.phoneNumber;
        localStorage.setItem("userDetails", JSON.stringify(this.loginForm));
        this.userLoginValidationSnackBar("Login Successful")
        this.router.navigate(['/dashboard']);
        break;

      case "Invalid Email & Valid Password":
        this.userLoginValidationSnackBar("Incorrect Email!");
        this.loginForm.email = "";
        this.getEmailErrorMessage();
        this.loginForm.password = "";
        this.getPasswordErrorMessage();
      break;

      case "Invalid Password & Valid Email":
        this.userLoginValidationSnackBar("Incorrect Password!");
        this.loginForm.password = "";
        this.getPasswordErrorMessage();
        break;

      default:
      this.userLoginValidationSnackBar("Incorrect Email and Password!");
      this.loginForm.email = "";
      this.loginForm.password = "";
        break;
    }
  }

  loadDashboard(){
    this.httpRequestsService.getRequest('userDetails').subscribe((data: any) => {
      data.forEach((user: any) => {
        if (this.loginForm.email.match(user.email)) {
          if (user.email == this.loginForm.email && user.password == this.loginForm.password) {
            this.userLoginValidation(user, "Valid Email & Password");
          } else if (user.email == this.loginForm.email && user.password != this.loginForm.password) {
            this.userLoginValidation(user, "Invalid Password & Valid Email");
          }  else if (user.email != this.loginForm.email && user.password == this.loginForm.password) {
            this.userLoginValidation(user, "Invalid Email & Valid Password");
          }
        } else {
          this.userLoginValidation(user, "");
        }
      });
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginInputForm.value);
  }

}
