import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  RouterOutlet,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
} from "@angular/router";
import { ItemService } from "../service/item.service";
import { Item } from "../classes/item";
import { slideInAnimation } from "src/animations/slide";
import { User } from "../classes/user";
import { UserService } from "../service/user.service";
import { MessageService } from "primeng/api";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  providers: [MessageService],
  styleUrls: ["./home.component.css"],
  animations: [
    slideInAnimation,
    //slideInAnimation
    // animation triggers go here
  ],
})
export class HomeComponent implements OnInit {
  /*search:String="";
  cart:number = 0;
  info:string ='TEAM ONOME';
  developer:boolean = true;
  user:User;
  placeholder:String = 'search store ...';
  min:number;
  max:number;
  log:string ='Login';
  reg:string = 'Register';
  regPix:string = 'group.png';
  total:number = 0;
  isMobileNav:boolean=false;
  changeText:boolean = true;
  showpreloader:boolean = true;*/
  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    //preLoader
    /*this.router.events.subscribe((routerEvent:Event)=>{

      if(routerEvent instanceof NavigationStart){
        this.showpreloader = true;
      }

      if(routerEvent instanceof NavigationEnd){
        this.showpreloader = false;
      }

   });*/
    //preloader
    //get user
    /* this.user = this.userService.getUserCredentials();
    if(this.user == null){
      this.log ='Login';
      this.reg = 'Register';
      this.regPix ='group.png';
    }
    else{
      this.log ='Logout';
      this.reg = 'Dashboard';
      this.regPix ='monitor-tablet-and-smartohone.png';
    }

    //cart count
    let cartItems:Item[] =this.itemService.getCart();
    this.cart = cartItems.length;
     //get Total
     this.total = 0;
     for(let i=0;i<cartItems.length;i++){
      if(cartItems[i].discount > 1){
       this.total += cartItems[i].newprice;
      }
      else{
      this.total += cartItems[i].price;
    }
    }
    let word:String = this.itemService.getSearchWord();
    if(word !=null){
      this.placeholder = word;
    }*/
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  ngOnInit(): void {
    //$('#main').click(function(){
    // if(($("#mobileSideNav").width()) > 0){
    // $('#navcontainer' ).toggleClass("change");
    // $("#mobileSideNav").css("width", "0px");
    // }
    // });
    /* $(document).ready(function(){
        $('#navcontainer').click(function(){
          $(this).toggleClass('change');
          if(($("#mobileSideNav").width()) == 0){
          $("#mobileSideNav").css("width", "250px");
          }
          else{
            $("#mobileSideNav").css("width", "0px"); 
          }
        });
      });


       //After mobile click
       $(".mobile").click(function(){
        if(($("#mobileSideNav").width()) > 0){
          $( '#navcontainer' ).toggleClass("change");
          $("#mobileSideNav").css("width", "0px");
        }
       });

   this.itemService._searchword$
   .subscribe((data)=>{
     this.placeholder = data;
   });

   this.itemService._cart$
   .subscribe((cart)=>{
     this.cart = cart.length;
   });
   
   //Total
   this.itemService._cart$
   .subscribe((carts)=>{
       //get Total
    this.total = 0;   
    for(let i=0;i<carts.length;i++){
     if(carts[i].discount > 1){
      this.total +=  carts[i].newprice;
     }
     else{
     this.total += carts[i].price;
   }
   }
   });

   //user
   this.userService._usr$
   .subscribe((user)=>{
     this.user = user;
     if(user == null){
      this.log ='Login';
      this.reg = 'Register';
      this.regPix ='group.png';
    }
    else{
      this.log ='Logout';
      this.reg = 'Dashboard';
      this.regPix ='monitor-tablet-and-smartohone.png';
    }
   })*/
  }

  /* logout(){
    this.userService.logout();
    this.router.navigate(['/home/store']);
  }

 
  changeInfo(value:number){
    if(value == 0){
      this.info = 'SOFTWARE'
      this.changeText = false;
    }
    else if(value == 1){
      this.info = 'TEAM ONOME'
      this.changeText = true;
    }
    
  }
   
  onSearch(){

    if(this.search == null || this.search === ""){
      //check if user has a search already
      let search:String = this.itemService.getSearchWord();
      if(search == null){
      //print all item search 
      this.itemService.setSearch("all product");
     this.router.navigate(['/home/search']);
      }
      else{
       //try new old search 
      this.itemService.setSearch(search+'');
      this.router.navigate(['/home/search']);
      }
    }

    else{
      this.itemService.setSearch(this.search.toLowerCase()+'');
      this.router.navigate(['/home/search']);
    }
   }

   searchStore(search:String){
      this.itemService.setSearch(search.toLowerCase()+'');
      this.router.navigate(['/home/search']);
    }
  

   prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  onBuy(){
    this.itemService.clearCart();
    this.messageService.add({severity:'info', summary:'Pending Order', detail:'Your order will be processed within 48 hours', sticky: true});
  }

  onClear(){
    this.itemService.clearCart();
    this.messageService.add({severity:'info', summary:'Success', detail:'Item(s) have been removed from cart', sticky: true});
  }

  onAcc(control:string){
  if(control === 'Login'){
    this.router.navigate(['/home/login']);
  }
  else if(control === 'Register'){
    this.router.navigate(['/home/register']); 
  }
  else if(control === 'Logout'){
    this.userService.logout();
    this.router.navigate(['/home/store']);  
  }
  else if(control === 'Dashboard'){
    this.router.navigate(['/home/user']);  
  }
  }*/
}
