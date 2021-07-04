import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ClientTestFormComponent } from './client-test-form/client-test-form.component';
import { HttpRequestsService } from 'src/app/utils/http-requests/http-requests.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  clientDetails!: any[];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: String[] = ['id', 'name', 'dob', 'gender', 'image'];

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clients!: any[];

  constructor(private router: Router, public dialog: MatDialog, private httpRequestsService: HttpRequestsService) {

   }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem("userDetails");
    this.userDetails = JSON.parse(this.userDetails);
    this.httpRequestsService.getRequest(`userDetails/${this.userDetails.userID}/clientDetails`).subscribe(
      (clients: any) => {
        this.dataSource = new MatTableDataSource(clients);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}
