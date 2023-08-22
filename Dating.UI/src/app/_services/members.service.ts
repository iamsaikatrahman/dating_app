import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'Users/GetUsers')
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'Users/GetUser/' + username)
  }
}