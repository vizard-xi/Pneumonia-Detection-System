import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ClientTestFormComponent } from './client-test-form/client-test-form.component';
import { Login } from '../utils/classes/Login/login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;

  constructor(private router: Router, public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem("userDetails");
    this.userDetails = JSON.parse(this.userDetails);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ClientTestFormComponent, {
      width: 'auto',
      height: 'auto'
    });
  }

  logout(){
    localStorage.removeItem("userDetails");
    this.router.navigate(['/login']);
  }

}
