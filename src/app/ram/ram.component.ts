import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Item } from '../classes/item';
import { Post } from '../classes/post';
import { Ram } from '../classes/ram';
import { Peripheral } from '../classes/Peripheral';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  providers: [MessageService],
  styleUrls: ['./ram.component.css']
})
export class RamComponent implements OnInit {

  
  userform: FormGroup;
  //New USed
  condition: SelectItem[];
  //PC
  brand: SelectItem[];
   //Ram
   ramBrand: SelectItem[]; 
   ramType: SelectItem[]; 
   ramSize: SelectItem[];
   ramFor: SelectItem[];
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
      'ramBrand': new FormControl('', Validators.required),
      'ramType': new FormControl('', Validators.required),
      'ramSize': new FormControl('', Validators.required),
      'ramFor' :new FormControl('',Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required)
  });

  //Brand
  this.ramBrand = [];
        this.ramBrand.push({label:'Select Brand', value:''});
        this.ramBrand.push({label:'Adata', value:'Adata'});
        this.ramBrand.push({label:'Asus', value:'Asus'});
        this.ramBrand.push({label:'Fujitsu', value:'Fujitsu'});
        this.ramBrand.push({label:'Hype X', value:'Hypr X'});
        this.ramBrand.push({label:'Ibm', value:'Ibm'});
        this.ramBrand.push({label:'Kingston', value:'Kingston'});
        this.ramBrand.push({label:'Lenovo', value:'Lenovo'});
        this.ramBrand.push({label:'PNY', value:'PNY'});
        this.ramBrand.push({label:'Samsung', value:'Samsung'});
        this.ramBrand.push({label:'Sandisk', value:'Sandisk'});
        this.ramBrand.push({label:'Seasonic', value:'Seasonic'});
        this.ramBrand.push({label:'sk Hynix', value:'sk Hynix'});
        this.ramBrand.push({label:'Toshiba', value:'Toshiba'});
        this.ramBrand.push({label:'Transcend', value:'Transcend'});

   //Ram For 
   this.ramFor = [];
   this.ramFor.push({label:'Select Device', value:''});
   this.ramFor.push({label:'Laptop', value:'Laptop'});
   this.ramFor.push({label:'Desktop', value:'Desktop'});

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});       

    //Ram Type
    this.ramType = [];
    this.ramType.push({label:'Type', value:''});
    this.ramType.push({label:'DDR2', value:'DDR2'});
    this.ramType.push({label:'DDR3', value:'DDR3'});
    this.ramType.push({label:'DDR3L', value:'DDR3L'});
    this.ramType.push({label:'DDR4', value:'DDR4'});

    //Ram Size
    this.ramSize = [];
    this.ramSize.push({label:'Size', value:''});
    this.ramSize.push({label:'2GB', value:'2GB'});
    this.ramSize.push({label:'3GB', value:'3GB'});
    this.ramSize.push({label:'4GB', value:'4GB'});
    this.ramSize.push({label:'6GB', value:'6GB'});
    this.ramSize.push({label:'8GB', value:'8GB'});
    this.ramSize.push({label:'12GB', value:'12GB'});
    this.ramSize.push({label:'16GB', value:'16GB'});
    this.ramSize.push({label:'32GB', value:'32GB'});

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
let title:String = posted.condition+' '+posted.ramBrand+' '+posted.ramSize+' '+posted.ramType+ ' ram';

//Search
let search:String  = ''+posted.ramBrand+ ' '+posted.ramType+' '+posted.condition+' '+posted.ramSize+' ram';

let ram:Ram ={
  brand:posted.ramBrand,
  ramType:posted.ramType,
  ramFor:posted.ramFor,
  size:posted.ramSize 
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

 //Peripheral
 let peripheral:Peripheral ={
  battery:null,
  hardDrive:null,
  screen:null,
  keyboard:null,
  charger:null,
  graphicsCard:null,
  processor:null,
  motherBoard:null,
  ram:ram
 }

let item:Item ={
  id:this.getId(posted.ramBrand,posted.ramType),
  brand:posted.ramBrand,
  picture:pictures,
  condition:posted.condition,
  title:title,
  description:this.autoDes?null:posted.description,
  search:search.toLowerCase(),
  laptop:null,
  peripheral:peripheral,
  accessary:null,
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
