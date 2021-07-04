import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/utils/classes/Client-Details/client-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HttpRequestsService } from 'src/app/utils/http-requests/http-requests.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-test-form',
  templateUrl: './client-test-form.component.html',
  styleUrls: ['./client-test-form.component.css']
})
export class ClientTestFormComponent implements OnInit {

  genders: String[] = ["Male", "Female"];
  clientTestForm: ClientDetails;
  clientTestAnalysesForm: boolean = true;
  clientTestAnalysesPreview: boolean = false;
  imageURL: any;
  snackBarDurationInSeconds: number = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userDetails: any;

  clientTestInputForm = new FormGroup({
    clientName : new FormControl('', [Validators.required]),
    clientDOB : new FormControl('', [Validators.required]),
    clientGender : new FormControl('', [Validators.required]),
    clientTestImage : new FormControl('', [Validators.required])
  });

  constructor( public dialogRef: MatDialogRef<ClientTestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientDetails, private httpRequestsService: HttpRequestsService,
    private _snackBar: MatSnackBar) {
    this.clientTestForm = new ClientDetails();
    this.userDetails = localStorage.getItem("userDetails");
    this.userDetails = JSON.parse(this.userDetails);
   }

  ngOnInit(): void {
  }

  handleFileInput(fileInput: any) {
    this.clientTestForm.clientTestImage = fileInput.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.clientTestForm.clientTestImage);

    fileReader.onload = (event) => {
      this.imageURL = event.target?.result;
      this.clientTestForm.clientTestImage = this.imageURL;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clientTestAnalyses() {
    this.clientTestAnalysesPreview = true
    this.clientTestAnalysesForm = false;
  }

  saveTestResults() {
    this.httpRequestsService.postRequest(`userDetails/${this.userDetails.userID}/clientDetails`, this.clientTestForm).subscribe();
    this.onNoClick();
    this._snackBar.open('Test Results Saved', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.snackBarDurationInSeconds * 1000,
      panelClass: ["customStyleForSnackbar"]
    });
  }

}
