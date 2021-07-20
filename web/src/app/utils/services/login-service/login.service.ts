import { Injectable } from '@angular/core';
import { Login } from '../../classes/Login/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userDetails: Login;

  constructor() {
    this.userDetails = new Login();
   }

  setUserDetails(userDetails: any) {
    this.userDetails = userDetails;
  }

  getUserDetails() {
    return this.userDetails;
  }
}
