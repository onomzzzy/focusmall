import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Item } from '../classes/item';
import { Post } from '../classes/post';
import { GamePad } from '../classes/gamepad';
import { Accessary } from '../classes/accessary';

@Component({
  selector: 'app-gamecontroller',
  templateUrl: './gamecontroller.component.html',
  providers: [MessageService],
  styleUrls: ['./gamecontroller.component.css']
})
export class GamecontrollerComponent implements OnInit {

  userform: FormGroup;
  //New USed
  condition: SelectItem[];
  //padType
  padType:SelectItem[];
  //PC
  brand: SelectItem[];
  autoDes: boolean = false;

  //List of Pictures
  pix:String ='../../assets/images/icons/image.png';
  pix1:String ='../../assets/images/icons/image.png';
  pix2:String ='../../assets/images/icons/image.png';
  pix3:String ='../../assets/images/icons/image.png';

  constructor(private fb: FormBuilder,private messageService:MessageService,private aws:AwsService) { }

  ngOnInit(): void {

    this.aws._upload$
    .subscribe((picture)=>{
      if(picture.length > 0){
      if(picture[0]== 0){
        this.pix = picture[1];
      }
      if(picture[0]== 1){
        this.pix1 = picture[1];
      }
      if(picture[0]== 2){
        this.pix2 = picture[1];
      }
      if(picture[0]== 3){
        this.pix3 = picture[1];
      }
      }
      else{
        this.messageService.add({severity:'error', summary:'Upload Failed', detail:'An Error ocurr.Please check your network', sticky: true});
      }
    });

    //Upload Item
    this.aws._uploadItem$
    .subscribe((msg)=>{
      this.messageService.add({severity:''+msg[0], summary:''+msg[1], detail:''+msg[2], sticky: true});
    });

    this.userform = this.fb.group({
      'condition': new FormControl('', Validators.required),
      'brand': new FormControl('', Validators.required),
      'padType': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required)
  });

  //Brand
  this.brand = [];
        this.brand.push({label:'Select Brand', value:''});
        this.brand.push({label:'Logiteck', value:'Logiteck'}); 
        this.brand.push({label:'Microsoft', value:'Microsoft'});
        this.brand.push({label:'Saiteck', value:'Saiteck'});  
        this.brand.push({label:'Sony', value:'Sony'}); 
        this.brand.push({label:'Thrustmaster', value:'Thrustmaster'}); 
        

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});  
   
   //Pad Type
   this.padType = [];
   this.padType.push({label:'Select Type', value:''});
   this.padType.push({label:'Wireless', value:'Wireless'});
   this.padType.push({label:'Wired', value:'Wired'});

  }

  handleChange(e) {
    if(e.checked){
      this.autoDes = true;
    }
    else{
      this.autoDes = false
    }
}



onUpload(event,no:number){
  let selecetdFile:File = event.target.files[0];
  this.aws.uploadPicture(selecetdFile,selecetdFile.name,no);
}

onSubmit(value: string) {
  
//Collect Pixtures
if((this.pix ==='../../assets/images/icons/image.png')&&
(this.pix1 ==='../../assets/images/icons/image.png')&&
(this.pix2 ==='../../assets/images/icons/image.png')&&
(this.pix3 ==='../../assets/images/icons/image.png')){
this.messageService.add({severity:'warn', summary:'Failed Upload', detail:'Item Picture(s) required', sticky: true});
}
else{
let posted:Post = JSON.parse(JSON.stringify(this.userform.value));
//Arrange Pictures
let pictures:String[] = [];
if(!(this.pix ==='../../assets/images/icons/image.png')){pictures.push(this.pix);}
if(!(this.pix1 ==='../../assets/images/icons/image.png')){pictures.push(this.pix1);}
if(!(this.pix2 ==='../../assets/images/icons/image.png')){pictures.push(this.pix2);}
if(!(this.pix3 ==='../../assets/images/icons/image.png')){pictures.push(this.pix3);}

//Title
let title:String = posted.condition+' '+posted.brand+' '+posted.padType+ ' controller';

//Search
let search:String  = ''+posted.brand+ ' '+posted.padType+' '+posted.condition+' controller pad game pad';

let pad:GamePad  ={
 padType: posted.padType
}

//Create Description if auto
let describe:String ='';
if(this.autoDes){}
else{
  if(posted.description == undefined||null||posted.description.length == 0){
   this.messageService.add({severity:'warn', summary:'Failed Upload', detail:'Description is Empty . Please fill description or switch on AUTO DESCRIPTION', sticky: true});
  }
  else{
  describe = posted.description;
}
}

//calculate new price if discount
let newprice:number =0;
if(posted.discount >0 && posted.discount < 100 ){
 let discount:number = posted.discount;
 let price:number = posted.price;
 newprice = (price) - (price*(discount/100));
}

//Accessary
let accessary:Accessary ={
  bag:null,
  cable:null,
  flashDrive:null,
  enclosure:null,
  mouse:null,
  touchpad:null,
  headset:null,
  gamepad:pad
}

let item:Item ={
 id:this.getId(posted.brand,posted.padType),
 brand:posted.brand,
 picture:pictures,
 condition:posted.condition,
 title:title,
 description:this.autoDes?null:posted.description,
 search:search.toLowerCase(),
 laptop:null,
 peripheral:null,
 accessary:accessary,
 software:null,
 itemlocation:posted.location,
 quantity:posted.quantity,
 price:posted.price,
 newprice:newprice,
 discount:posted.discount,
 online:true
}
this.aws.uploadItem(item,'FocusMall');

}

  }

  getId(brand:String,model:String):String{
    let date:Date = new Date();  
  return brand+'-'+date.getTime().toString()+'-'+ model;
  }

}
