import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})


export class TestErrorsComponent implements OnInit{
  baseUrl:string = 'https://localhost:7152/api/';
  validationErrors!: string[];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    
  }

  get404Error(){
    this.http.get(this.baseUrl + 'Buggy/GetNotFound').subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  
  get400Error(){
    this.http.get(this.baseUrl + 'Buggy/GetBadRequest').subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  get500Error(){
    this.http.get(this.baseUrl + 'Buggy/GetServerError').subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  get401Error(){
    this.http.get(this.baseUrl + 'Buggy/GetSecret').subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  
  get400ValidationError(){
    this.http.post(this.baseUrl + 'Account/Register', {}).subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (response) => {
        console.log(response);
        this.validationErrors = response;
      }
    })
  }


}
