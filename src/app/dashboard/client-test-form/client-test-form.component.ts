import { Component, Input, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/utils/classes/Client-Details/client-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  clientTestAnalysesSuccessful: boolean = false;
  imageURL: any;
  snackBarDurationInSeconds: number = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userDetails: any;
  imageUploadStatus: string = "No Image Selected";
  today = new Date();

  clientTestInputForm = new FormGroup({
    clientName : new FormControl('', [Validators.required]),
    clientDOB : new FormControl('', [Validators.required]),
    clientGender : new FormControl('', [Validators.required]),
    clientTestImage : new FormControl('', [Validators.required])
  });

  constructor( private httpRequestsService: HttpRequestsService,
    private _snackBar: MatSnackBar) {
    this.clientTestForm = new ClientDetails();
    this.userDetails = localStorage.getItem("userDetails");
    this.userDetails = JSON.parse(this.userDetails);
   }

  ngOnInit(): void {
  }

  handleFileInput(fileInput: any) {
    this.clientTestForm.clientTestImage = fileInput.files[0];
    this.postRequestToAnalyseImage(this.clientTestForm.clientTestImage);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.clientTestForm.clientTestImage);

    fileReader.onload = (event) => {
      this.imageURL = event.target?.result;
      this.clientTestForm.clientTestImage = this.imageURL;
    };
    if (this.clientTestForm.clientTestImage == null) {
      this.imageUploadStatus;
    } else {
      this.imageUploadStatus = "Image Uploaded";
    }
  }

  clientTestAnalyses() {
    this.clientTestAnalysesPreview = true;
    this.clientTestAnalysesForm = false;
  }

  saveTestResults() {
    this.httpRequestsService.postRequest(`userDetails/${this.userDetails.userID}/clientDetails`, this.clientTestForm).subscribe();
    this._snackBar.open('Test Results Saved', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.snackBarDurationInSeconds * 1000,
      panelClass: ["customStyleForSnackbar"]
    });
    this.clientTestAnalysesPreview = false;
    this.clientTestAnalysesForm = false;
    this.clientTestAnalysesSuccessful = true;
    let timer = 5;
    let countDownTimer = setInterval(() => {
      timer = timer - 1;
      if (timer === 0) {
        this.clientTestAnalysesForm = true;
        this.clientTestAnalysesPreview = false;
        this.clientTestAnalysesSuccessful = false;
        this.clientTestForm.clientDOB = new Date();
        this.clientTestForm.clientGender = "";
        this.clientTestForm.clientName = "";
        this.clientTestForm.clientTestImage = null;
        this.clientTestInputForm.reset;
        clearInterval(countDownTimer);
      }
    }, 1000);
  }

  postRequestToAnalyseImage(body: any) {
    this.httpRequestsService.postRequestForImageAnalyses(body).subscribe((data: any) => {
      data.map((result: any) => {
        if (result.probability == 1) {
          this.clientTestForm.clientTestAnalysesResult = result.tagName
        }
      });
    })
  }

}
