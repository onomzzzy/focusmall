import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Item } from '../classes/item';
import { Accessary } from '../classes/accessary';
import { Bag } from '../classes/bag';
import { Post } from '../classes/post';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  providers: [MessageService],
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {

  userform: FormGroup;
  //New USed
  condition: SelectItem[];
  //PC
  autoDes: boolean = false;
  size: SelectItem[];

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
      'color': new FormControl('', Validators.required),
      'size': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required)
  });
        

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});       

    //Color
    this.size = [];
    this.size.push({label:'Select Size', value:''});
    this.size.push({label:'17 inch', value:'17 inch'});
    this.size.push({label:'15 inch', value:'15 inch'});
    this.size.push({label:'14 inch', value:'14 inch'});
    this.size.push({label:'13 inch', value:'13 inch'});
    this.size.push({label:'12 inch', value:'12 inch'});
      
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
 let title:String = posted.condition+' '+posted.brand+' '+posted.size+' bag';

 //Search
 let search:String  = ''+posted.brand+ ' '+posted.size+' '+posted.condition+' '+posted.color+' bag';

 let bag:Bag ={
  size:posted.size,
  color:posted.color   
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
  bag:bag,
  cable:null,
  flashDrive:null,
  enclosure:null,
  mouse:null,
  touchpad:null,
  headset:null,
  gamepad:null
}

 let item:Item ={
   id:this.getId(posted.brand,posted.color),
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
