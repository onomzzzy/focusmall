import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Item } from '../classes/item';
import { Proccessor } from '../classes/processor';
import { Peripheral } from '../classes/Peripheral';
import { Post } from '../classes/post';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  providers: [MessageService],
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {

  userform: FormGroup;
  //New USed
  condition: SelectItem[];
  autoDes: boolean = false;
  processorBrand: SelectItem[];
  processorModel: SelectItem[];
  processorCore:SelectItem[];
  processorGen:SelectItem[];

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
      'processorBrand': new FormControl('', Validators.required),
      'processorSpeed': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'turboSpeed': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'processorModel': new FormControl('', Validators.required),
      'processorGen': new FormControl('', Validators.required),
      'processorCore': new FormControl('', Validators.required)
  });
        

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});       
 //processor Brand
 this.processorBrand = [];
 this.processorBrand.push({label:'Brand', value:''});
 this.processorBrand.push({label:'AMD', value:'Amd'});
 this.processorBrand.push({label:'INTEL', value:'Intel'});

 //initial Processor Model
 this.processorModel = [];
 this.processorModel.push({label:'Model', value:''});


  //Processor Core
  this.processorCore = [];
  this.processorCore.push({label:'Cores', value:''});
  this.processorCore.push({label:'Single Core', value:'Single Core'});
  this.processorCore.push({label:'Dual Core', value:'Dual Core'});
  this.processorCore.push({label:'Quad Core', value:'Quad Core'});
  this.processorCore.push({label:'6 Core', value:'6 Core'});
  this.processorCore.push({label:'8 Core', value:'8 Core'});
  this.processorCore.push({label:'16 Core', value:'16 Core'});
  this.processorCore.push({label:'32 Core', value:'32 Core'});

 //Processor Generation
  //initial Processor Model
  this.processorGen = [];
  this.processorGen.push({label:'Generation', value:''});
  this.processorGen.push({label:'Non Gen', value:'non gen'});
  this.processorGen.push({label:'1st Gen', value:'1st gen'});
  this.processorGen.push({label:'2nd Gen', value:'2nd gen'});
  this.processorGen.push({label:'3rd Gen', value:'3rd gen'});
  this.processorGen.push({label:'4th Gen', value:'4th gen'});
  this.processorGen.push({label:'5th Gen', value:'5th gen'});
  this.processorGen.push({label:'6th Gen', value:'6th gen'});
  this.processorGen.push({label:'7th Gen', value:'7th gen'});
  this.processorGen.push({label:'8th Gen', value:'8th gen'});
  this.processorGen.push({label:'9th Gen', value:'9th gen'});
  this.processorGen.push({label:'10th Gen', value:'10th gen'});


  }

  handleChange(e) {
    if(e.checked){
      this.autoDes = true;
    }
    else{
      this.autoDes = false
    }
}

onChange(event){
  //refill
  this.processorModel = [];
  this.processorModel.push({label:'Processor Model', value:''});
  //
  if(this.userform.get('processorBrand').value === 'Intel'){ 
  this.processorModel.push({label:'Core 2', value:'core 2'});
  this.processorModel.push({label:'Celeron', value:'celeron'}); 
  this.processorModel.push({label:'Pentium', value:'Pentium'});  
  this.processorModel.push({label:'i3', value:'i3'});
  this.processorModel.push({label:'i5', value:'i5'});
  this.processorModel.push({label:'i7', value:'i7'});
  this.processorModel.push({label:'i9', value:'i9'});
}
else if(this.userform.get('processorBrand').value === 'Amd'){
  this.processorModel.push({label:'ryzen 3', value:'ryzen 3'});
  this.processorModel.push({label:'ryzen 5', value:'ryzen 3'});
  this.processorModel.push({label:'ryzen 7', value:'ryzen 3'});
  this.processorModel.push({label:'ryzen 9', value:'ryzen 3'});
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
  let title:String = posted.condition+' '+posted.processorBrand+' '+posted.processorGen+' '+posted.processorModel+ ' processor';

  //Search
  let search:String  = ''+posted.processorBrand+ ' '+posted.processorModel+' '+posted.condition+' '+posted.processorCore+' '+posted.processorSpeed+'GHZ'+' '+posted.turboSpeed+'GHZ'+' '+posted.processorGen+'  processor';

  let processor:Proccessor ={
    brand:posted.processorBrand,   
    model:posted.processorModel,
    speed:posted.processorSpeed+'GHZ',
    turboSpeed:posted.turboSpeed+'GHZ',
    generation:posted.processorGen,
    core:posted.processorCore  
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
    processor:processor,
    motherBoard:null,
    ram:null
   }

  let item:Item ={
    id:this.getId(posted.processorBrand,posted.processorModel),
    brand:posted.processorBrand,
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
