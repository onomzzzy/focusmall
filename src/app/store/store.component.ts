import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../classes/item';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   this.itemService.setPreviousPage('Store');
  }
  latestProduct:Item[] = [];
// responsiveOptions;
  constructor(private itemService:ItemService,private router:Router) {
  }


  ngOnInit(): void {
    this.itemService.getStoreItems("FocusMall")
    .subscribe((data)=>{
      let latest:Item[] = JSON.parse(JSON.stringify(data));
      this.latestProduct = latest.reverse();
    },
    (error)=>{
     console.log(" An Error Occured !!!")
    }
    );

  }

  onClickItem(item:Item){
       this.itemService.setItemDisplay(item);
       this.router.navigate(['/home/product']);
  }

  onClickSpecialOffer(no:number){
    if(no == 0){
    this.itemService.setSpecialOffer('4th 5th 6th 7th 8th 9th 10th ryzen');
    this.router.navigate(['/home/specialoffer']);
    }
    else if(no == 1){
    this.itemService.setSpecialOffer('nvidia vega gtx rtx rx radeon');
    this.router.navigate(['/home/specialoffer']);
    }
    else if(no == 2){
    this.itemService.setSpecialOffer('9th');
    this.router.navigate(['/home/specialoffer']);
    }
  }

}
