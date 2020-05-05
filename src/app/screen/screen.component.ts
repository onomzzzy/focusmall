import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Item } from '../classes/item';
import { Peripheral } from '../classes/Peripheral';
import { Display } from '../classes/screen';
import { Post } from '../classes/post';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  providers: [MessageService],
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  userform: FormGroup;
  //New USed
  condition: SelectItem[];

  //HDtype Type
  screenType: SelectItem[];
  //SIze
  screenSize:SelectItem[];

  screenDisplay:SelectItem[];

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
      'model': new FormControl('', Validators.required),
      'screenSize': new FormControl('', Validators.required),
      'screenDisplay': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'screenType': new FormControl('', Validators.required)
  });

  //Screen
  this.screenSize = [];
        this.screenSize.push({label:'Select Size', value:''});
        this.screenSize.push({label:'17.3 inches',value:'17.3 inches'}); 
        this.screenSize.push({label:'17 inches',value:'17 inches'});
        this.screenSize.push({label:'16 inches',value:'16 inches'}); 
        this.screenSize.push({label:'15.7 inches',value:'15.7 inches'}); 
        this.screenSize.push({label:'15.6 inches',value:'15.6 inches'}); 
        this.screenSize.push({label:'15.4 inches',value:'15.4 inches'});
        this.screenSize.push({label:'15 inches',value:'15 inches'}); 
        this.screenSize.push({label:'14.1 inches',value:'14.1 inches'});  
        this.screenSize.push({label:'14 inches',value:'14 inches'});
        this.screenSize.push({label:'13.3 inches',value:'13.3 inches'});  
        this.screenSize.push({label:'13 inches',value:'13 inches'});
        this.screenSize.push({label:'12.1 inches',value:'12.1 inches'}); 
        this.screenSize.push({label:'12 inches',value:'12 inches'}); 
        this.screenSize.push({label:'11 inches',value:'11 inches'}); 
        

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});       

    //screen Type
    this.screenType = [];
    this.screenType.push({label:'Screen Type', value:''});
    this.screenType.push({label:'Module', value:'Module'});
    this.screenType.push({label:'Paper', value:'Paper'});
    this.screenType.push({label:'Moduleless', value:'Moduless'});

     //Screen Display
   this.screenDisplay = [];
   this.screenDisplay.push({label:'Select Display Type',value:''});
   this.screenDisplay.push({label:'LCD',value:'LCD'});
   this.screenDisplay.push({label:'LED',value:'LED'});
   this.screenDisplay.push({label:'IPS',value:'IPS'});

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
 let title:String =''+posted.condition+' '+posted.screenSize+' '+posted.screenDisplay+' '+posted.screenType+ ' screen';

 //Search
 let search:String  = posted.condition+' '+posted.screenType+' '+posted.screenSize+' '+posted.screenDisplay+'  screen';

 let screen:Display ={
  size:posted.screenSize,
  displaytype:posted.screenType,
  displaykind:posted.screenDisplay     
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
   screen:screen,
   keyboard:null,
   charger:null,
   graphicsCard:null,
   processor:null,
   motherBoard:null,
   ram:null
  }

 let item:Item ={
   id:this.getId(posted.screenType,posted.screenSize),
   brand:posted.model,
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



