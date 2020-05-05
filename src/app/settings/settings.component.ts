import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [MessageService],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
