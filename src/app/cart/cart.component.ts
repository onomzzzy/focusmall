import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item';
import { ItemService } from '../service/item.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 cartItems:Item[] = [];
 total:number =0;

  constructor(private itemService:ItemService) { 
    this.cartItems = this.itemService.getCart();
  }

  ngOnInit(): void {
    this.itemService._cart$
    .subscribe((carts)=>{
      this.cartItems = [];
      this.cartItems = carts;
      this.total = 0;
        //get Total
     for(let i=0;i<carts.length;i++){
      if(carts[i].discount > 1){
       this.total += carts[i].newprice;
      }
      else{
      this.total += carts[i].price;
    }
    }
    });
  }

  deleteCartItem(item:Item){
    //Get All Item
    this.itemService.getStoreItems("FocusMall")
    .subscribe((data)=>{
      let store:Item[] = JSON.parse(JSON.stringify(data));
      //get cart
      let cartItem:Item[] = this.cartItems;
      if(store.length > 0){
         for(let i=0;i<store.length;i++){
           if(store[i].id === item.id){
            //loop via cartitems
            for(let j=0;j<cartItem.length;j++){
              if(cartItem[j].id === item.id){
                if(item.quantity > 1){
                  cartItem[j].quantity = cartItem[j].quantity - 1;
                  if(cartItem[j].discount > 0){
                   let price:number = cartItem[j].quantity * store[i].newprice;
                   cartItem[j].newprice = price;
                  }
                  else{
                    let price:number = cartItem[j].quantity * store[i].price;
                    cartItem[j].price = price;
                  }
                }
                else{
                  cartItem.splice(j,1);
                }
              }
            }
            
           }
         }
         this.itemService.deleteItemFromCart(cartItem);
      }
      else{}
    },
    (error)=>{

    }
    );
 
  }

}
