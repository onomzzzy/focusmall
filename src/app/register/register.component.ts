import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [MessageService],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userform: FormGroup;

  constructor(private userService:UserService,private fb: FormBuilder,private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'confirmpassword':new FormControl('',[Validators.required, Validators.minLength(6)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  }

  onSubmit(value: string) {

   if(!(this.userform.get('password').value === this.userform.get('confirmpassword').value)){
    this.messageService.add({severity:'error', summary:'Registration Failure', detail:'Password does not match', sticky: true});
   }
   else{
    this.messageService.add({severity:'info', summary:'Success', detail:'Registration successful', sticky: true});
   }

  }

}
