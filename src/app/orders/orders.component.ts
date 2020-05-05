import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Order } from '../classes/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orders:Order[] = [];
  constructor(private itemService:ItemService) { 
  this.itemService.getOrders()
  .then((order)=>{
   this.orders = order;
  });
  }

  getNewPrice(a:number,b:number){
    return (b-((a/100)*b));
  }

  ngOnInit(): void {
  }

}
