import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService, private toastr: ToastrService){}
  register(){
    this.accountService.register(this.model).subscribe({
      next:(respose)=>{
        console.log(respose)
        this.cancel();
      },
      error:(response) => {
        console.log(response);
        this.toastr.error(response.error)
      }
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
