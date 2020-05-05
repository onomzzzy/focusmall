import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClicklinkedin(value:number){
    if(value == 0){
      window.open('https://www.linkedin.com/in/samuel-ojumah-55929010a', "_blank");
    }
    else if(value == 1){
      window.open('https://www.linkedin.com/in/imoh-simon-424220101', "_blank");
    }
    
  }

}
