import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating UI';
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService) {}
  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }
  // getUsers(){
  //   this.http.get('https://localhost:7152/api/Users/GetUsers').subscribe({
  //     next:(response) => {
  //       this.users = response;
  //     },
  //     error:(response) => {
  //       console.log(response)
  //     }
  //   });
  // } 
}
