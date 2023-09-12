import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl:string = environment.apiUrl;
  members: Member[] = [];
  constructor(private http:HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members)
    return this.http.get<Member[]>(this.baseUrl + 'Users/GetUsers').pipe(
        map(members => {
          this.members = members;
          return members;
        })
      )
  }

  getMember( username: string){
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'Users/GetUser/' + username)
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'Users/UpdateUser', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }


}
