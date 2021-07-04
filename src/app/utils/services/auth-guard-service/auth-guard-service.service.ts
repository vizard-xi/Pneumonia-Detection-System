import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) { }

}
