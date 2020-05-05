import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-focus-advent',
  templateUrl: './focus-advent.component.html',
  styleUrls: ['./focus-advent.component.css']
})
export class FocusAdventComponent implements OnInit {
  focusAd:Item[] = [];
  responsiveOptions: any
  constructor(private itemService:ItemService,private router:Router) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 2
      },
      {
        breakpoint: '850px',
        numVisible: 2,
        numScroll: 1
    },
      {
          breakpoint: '768px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '560px',
          numVisible: 2,
          numScroll: 1
      },
      {
        breakpoint: '315px',
        numVisible: 1,
        numScroll: 1
    }
  ];
   }

  ngOnInit(): void {

    this.itemService.getStoreItems("FocusMall")
    .subscribe((data)=>{
      let item:Item[] = JSON.parse(JSON.stringify(data));
      for(let i=0;i<item.length;i++){
        //Under 40k
        if(item[i].price <= 40000){
          this.focusAd.push(item[i]);
        }
      }
    });
  }

  getNewPrice(price:number,discount:number){
    let x:number = price * (discount/100);
    return (price - x);
  }

  onClickItem(item:Item){
        this.itemService.setItemDisplay(item);
        this.itemService.setPreviousPage('/home/store');
        this.router.navigate(['/home/product']);
   }

}
