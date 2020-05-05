import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: FormGroup;

  constructor(private userService:UserService,private fb: FormBuilder,private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'rememberMe':new FormControl(''),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  }

  onSubmit(value: string) {
   this.userService.getUsers()
    .then((users)=>{
       
      for(let i=0;i<users.length;i++){
        
       
        if(this.userform.get('username').value === users[i].username){
          console.log('login '+(this.userform.get('username').value === users[i].username));
          //check password
          if(this.userform.get('password').value === users[i].password){
            console.log(' password '+ (this.userform.get('password').value === users[i].password));
            this.userService.setUserCredentials(users[i]);
            this.router.navigate(['/home/user']);
          }
          else{
            this.messageService.add({severity:'error', summary:'Failed Login', detail:'Invalid Credentials', sticky: true});
          }
        }
        else{
          this.messageService.add({severity:'error', summary:'Failed Login', detail:'Invalid Credentials', sticky: true});
        }
      }
    });


  }

}
