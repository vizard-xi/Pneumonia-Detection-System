import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInState: boolean = false;

  constructor(public jwtHelper: JwtHelperService) { }

  isLoggedOut(): boolean {
    return this.loggedInState;
  }

  isLoggedIn():boolean {
    return this.loggedInState = true;
  }
}
