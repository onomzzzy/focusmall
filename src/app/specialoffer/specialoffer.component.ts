import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import { Item } from '../classes/item';

@Component({
  selector: 'app-specialoffer',
  templateUrl: './specialoffer.component.html',
  styleUrls: ['./specialoffer.component.css']
})
export class SpecialofferComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.itemService.setPreviousPage('SpecialOffer');
   }
  offerItem: Item[] = [];
  pixs:String;
  specialoffers:string;
  offerText:string;

  constructor(private itemService:ItemService,private router:Router) {
   let special:string = this.itemService.getSpecialOffer();
   if(special == null){
    this.specialoffers = '4th 5th 6th 7th 8th 9th 10th ryzen';
    this.pixs ='../../assets/images/carosel/carosel.jpg';
    this.offerText = 'Create Splendid Moments with Intel and Amd new ultra-slim laptops with lastest architectures';
   }
   else{
     this.specialoffers = special;
     if(special ==='nvidia vega gtx rtx rx radeon'){
       this.pixs ='../../assets/images/carosel/carosel1.jpg';
       this.offerText = 'Get the best offer for gaming laptops ranging from low end gaming to high performances gaming';
     }
     else if(special ==='4th 5th 6th 7th 8th 9th 10th ryzen'){
      this.pixs ='../../assets/images/carosel/carosel.jpg';
      this.offerText = 'Create Splendid Moments with Intel and Amd new ultra-slim laptops with lastest architectures';
     }
     else if(special ==='9th'){
      this.pixs ='../../assets/images/carosel/carosel3.jpg';
      this.offerText = 'Achieve quality in no time with Intel 9th generation processor power and AMD ryzen architectures';
     }
   }

   }

  ngOnInit(): void {
    this.itemService.getStoreItems("FocusMall")
    .subscribe((data)=>{
      let offer:Item[] = JSON.parse(JSON.stringify(data));
      let regex = new RegExp(this.specialoffers.split(" ").join('|'));
      offer = offer.filter(n => (n.search.search(regex) > 0));
        if(offer.length > 0){
          this.offerItem = offer.reverse();
        }

    },
    (error)=>{
     console.log(" An Error Occured at Special offor !!!")
    }
    );
  }

  onClickItem(item:Item){
    this.itemService.setItemDisplay(item);
    this.router.navigate(['/home/product']);
}

}
