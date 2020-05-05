import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import { Item } from '../classes/item';
import { AwsService } from '../service/aws.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   this.itemService.setPreviousPage('Search');
  }

  searchItem:Item[] = [];
  originalItem:Item[];
  search:String;
  brand:String;
  max:number = 0
  min:number = 0;
  constructor(private itemService:ItemService,private router:Router/*,private aws:AwsService*/) { 
    let searchword:string = this.itemService.getSearchWord();
    this.search = searchword;
    //check if null
    if(searchword == null || searchword.indexOf("all products") > 0){
      this.itemService.getStoreItems("FocusMall")
      .subscribe((data)=>{
        this.searchItem = [];
        let item:Item[] = JSON.parse(JSON.stringify(data));
        this.searchItem = item;
        this.originalItem = item;
      });
    }
    else{
      this.itemService.getStoreItems("FocusMall")
      .subscribe((data)=>{
        this.searchItem = [];
        let item:Item[] = JSON.parse(JSON.stringify(data));
        let regex = new RegExp(searchword.split(" ").join('|'));
        this.searchItem = item.filter(n => (n.search.search(regex) > 0));
        this.originalItem = this.searchItem;
      });
    }
  }

  ngOnInit(): void {
    this.itemService._searchword$
    .subscribe((searchword)=>{

      this.search = searchword;
      if(searchword == null || searchword === "all products"){
        this.itemService.getStoreItems("FocusMall")
        .subscribe((data)=>{
          this.searchItem = [];
          let item:Item[] = JSON.parse(JSON.stringify(data));
          this.searchItem = item;
          this.originalItem = item;
        });
      }
      else{
      this.itemService.getStoreItems("FocusMall")
      .subscribe((data)=>{
        this.searchItem = [];
        let item:Item[] = JSON.parse(JSON.stringify(data));
        let regex = new RegExp(searchword.split(" ").join('|'));
        this.searchItem = item.filter(n => (n.search.search(regex) > 0));
        this.originalItem = this.searchItem;
      });
    }
    });

  }

  onClickItem(item:Item){
        this.itemService.setItemDisplay(item);
        this.router.navigate(['/home/product']);
   }


}
