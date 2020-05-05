import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  items:Item[] = [];
  responsiveOptions
  constructor(private itemService:ItemService) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
        breakpoint: '850px',
        numVisible: 2,
        numScroll: 2
    },
      {
          breakpoint: '768px',
          numVisible: 3,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 2,
          numScroll: 1
      },
      {
        breakpoint: '378px',
        numVisible: 1,
        numScroll: 1
    }
  ];
  }

  ngOnInit(): void {
    this.itemService.getItems()
    .then((data)=>{
     if(data !=null){
       this.items = data;
     }});
  }

  getNewPrice(price:number,discount:number){
    let x:number = price * (discount/100);
    return (price - x);
  }

}
