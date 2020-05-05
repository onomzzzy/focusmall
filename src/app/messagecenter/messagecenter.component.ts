import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Message } from '../classes/message';

@Component({
  selector: 'app-messagecenter',
  templateUrl: './messagecenter.component.html',
  styleUrls: ['./messagecenter.component.css']
})
export class MessagecenterComponent implements OnInit {
msg:Message[] = [];
  constructor(private userService:UserService) { 
  this.userService.getUserMessage()
  .then((msg)=>{
    this.msg = msg;
  })
  }

  ngOnInit(): void {
  }

}
