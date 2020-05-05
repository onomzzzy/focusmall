import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item';
import { ItemService } from '../service/item.service';
import { SelectItem } from 'primeng/api/selectitem';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [MessageService],
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 item:Item;
 images: any[];
  quantity: SelectItem[];
  formerPage:string;
  selectedQuantity:number;
  originalPrice:number;
  discounted:number;

  constructor(private itemService:ItemService,private router:Router,private messageService:MessageService) { 
   this.formerPage = this.itemService.getPreviousPage();
    let testItem:Item = this.itemService.getItemDisplay();
    this.images = [];
    if(testItem == null){
      this.itemService.getItems()
      .then((data)=>{
        this.item = data[5];
        this.originalPrice = data[5].price;
        this.discounted = data[5].newprice;
        for(let i=0;i<data[5].picture.length;i++){
          this.images.push({source:data[5].picture[i], alt:'', title:''});
        }
        this.quantity = [];
        this.quantity.push({label:'Select Qty', value:''});
        for(let j=0; j<this.item.quantity;j++){
        this.quantity.push({label:''+(j+1), value:(j+1)});
        }
      });
    }
    else{
     this.item = testItem;
     this.originalPrice = this.item.price;
     this.discounted = this.item.newprice;
     for(let i=0;i<testItem.picture.length;i++){
      this.images.push({source:testItem.picture[i], alt:'', title:''});
    }
    this.quantity = [];
    this.quantity.push({label:'Select Quantity', value:''});

    for(let j=0; j<this.item.quantity;j++){
    this.quantity.push({label:''+(j+1), value:(j+1)});
    }
    
    }

  }

  getNewPrice(discount:number,price:number){
    return (price-((discount/100)*price));
  }

  onBackNavigate(){
    this.router.navigate(['/home/'+this.itemService.getPreviousPage().toLocaleLowerCase()]);
  }

  onAddCart(value:String){
   if(this.selectedQuantity == null || this.selectedQuantity == undefined || this.selectedQuantity.toString.length == 0){
     //check if out of stock
     if(this.item.quantity > 0){
     //remain user to select quantity
     this.messageService.add({severity:'error', summary:'No Quantity', detail:'Please Select Quantity', sticky: true});
     }
     else{
       //Ask user if He/She wants to order this item;
     }
   }
   else{
     let cart:Item = this.item;
     cart.quantity = this.selectedQuantity;
     this.itemService.setCart(cart);
     this.messageService.add({severity:'info', summary:'Success', detail:'Item added to cart successfully', sticky: true});
   }
  }

  onChange(event){
    if(this.selectedQuantity == null || this.selectedQuantity == undefined 
      || this.selectedQuantity.toString.length == 0 ||
       this.selectedQuantity == 1){
      this.item.price = this.originalPrice;
      this.item.newprice = this.discounted;
    }
    else{
      let price:number = 0;

      if(this.item.discount > 0){
       price = this.selectedQuantity * this.discounted;
       this.item.newprice = price;
      }
     
      price = this.selectedQuantity * this.originalPrice;
      this.item.price = price;

    }
  }
  
  ngOnInit(): void {

   
  }
  

}
