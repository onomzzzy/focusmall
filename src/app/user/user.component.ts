import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [MessageService],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 //Reset Password
 oldpasswordz:string;
 passwordz:string;
 confirmpasswordz:string;

 userform: FormGroup;
 userform2: FormGroup;
 user:User = null;
  constructor(private userService:UserService,private fb: FormBuilder,private fb2: FormBuilder, private messageService: MessageService) { 
    this.userService.getUsers()
    .then((users)=>{
     this.user = users[0];
    });
  }

 
  ngOnInit(): void {
    this.userform = this.fb.group({
      'phonenumber': new FormControl(''),
      'whatsapp': new FormControl(''),
      'state': new FormControl(''),
      'lga': new FormControl(''),
      'address': new FormControl('') });

      this.userform2 = this.fb2.group({
        'oldpassword': new FormControl('', Validators.required),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'confirmpassword': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(value: string) {}

  onSubmitPassword(value: string) {}

  
onUpload(event) {}



}
