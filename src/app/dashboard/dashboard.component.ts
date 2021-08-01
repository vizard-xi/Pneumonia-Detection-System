import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ClientTestFormComponent } from './client-test-form/client-test-form.component';
import { HttpRequestsService } from 'src/app/utils/http-requests/http-requests.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../utils/services/auth-service/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  clientDetails!: any[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: String[] = ['id', 'name', 'dob', 'gender', 'result'];
  clients: any[] = [];
  hidePassword: boolean = true;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, public dialog: MatDialog, private httpRequestsService: HttpRequestsService,
    public auth: AuthService) {
      this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
      this.userDetails = localStorage.getItem("userDetails");
      this.userDetails = JSON.parse(this.userDetails);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getClientData();
  }

  openDialog() {
    this.dialog.open(ClientTestFormComponent, {
      width: 'auto',
      height: 'auto'
    });
  }

  logout(){
    localStorage.removeItem("userDetails");
    this.router.navigate(['/login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getClientData() {
    this.clients = [];
    this.httpRequestsService.getRequest(`userDetails/${this.userDetails.userID}`).subscribe((clients: any) => {
      clients.clientDetailsList.map((client: any) => {
        delete client.clientTestImage;
        this.clients.push(client);
      })
      this.dataSource.data = this.clients;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateUserDetails() {
    let body = new Object({
      "name" : this.userDetails.name,
      "phoneNumber" : this.userDetails.phoneNumber,
      "email" : this.userDetails.email,
      "password" : this.userDetails.password
    });
    this.httpRequestsService.putRequest("userDetails", this.userDetails.userID, body).subscribe();
  }
}
