import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Item } from '../classes/item';
import { Peripheral } from '../classes/Peripheral';
import { HardDrive } from '../classes/hd';
import { Post } from '../classes/post';

@Component({
  selector: 'app-harddrive',
  templateUrl: './harddrive.component.html',
  providers: [MessageService],
  styleUrls: ['./harddrive.component.css']
})
export class HarddriveComponent implements OnInit {
  userform: FormGroup;
  //New USed
  condition: SelectItem[];

  //HDtype Type
  hdType: SelectItem[];
  //SIze
  hdSize:SelectItem[];
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
      'hdSize': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'hdType': new FormControl('', Validators.required)
  });

  //Brand
  this.brand = [];
        this.brand.push({label:'Select Brand', value:''});
        this.brand.push({label:'Adata', value:'Adata'});
        this.brand.push({label:'Apple', value:'Apple'});
        this.brand.push({label:'Hitachi', value:'Hatachi'});
        this.brand.push({label:'Hp', value:'Hp'});
        this.brand.push({label:'Intel', value:'Intel'});
        this.brand.push({label:'Kingston', value:'Kingston'});
        this.brand.push({label:'Mushikin', value:'Mushikin'});
        this.brand.push({label:'Samsung', value:'Samsung'});
        this.brand.push({label:'Sandisk', value:'Sandisk'});
        this.brand.push({label:'Seagate', value:'Seagate'});
        this.brand.push({label:'Sony', value:'Sony'});
        this.brand.push({label:'Toshiba', value:'Toshiba'});
        this.brand.push({label:'Transcend', value:'Transcend'});
        this.brand.push({label:'WD', value:'WD'});
        

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});       

    //Hard Drive Type
    this.hdType = [];
    this.hdType.push({label:'HardDrive Type', value:''});
    this.hdType.push({label:'Hard Drive Disk', value:'HDD'});
    this.hdType.push({label:'Solid State Drive', value:'SSD'});
    this.hdType.push({label:'M.2', value:'M.2 SSD'});
    this.hdType.push({label:'NVMe', value:'NVMe SSD'});

    //Hard Drive Size
   this.hdSize = [];
   this.hdSize.push({label:'Size', value:''});
   this.hdSize.push({label:'32GB', value:'32GB'});
   this.hdSize.push({label:'40GB', value:'40GB'});
   this.hdSize.push({label:'60GB', value:'60GB'});
   this.hdSize.push({label:'64GB', value:'64GB'});
   this.hdSize.push({label:'80GB', value:'80GB'});
   this.hdSize.push({label:'120GB', value:'120GB'});
   this.hdSize.push({label:'128GB', value:'128GB'});
   this.hdSize.push({label:'250GB', value:'250GB'});
   this.hdSize.push({label:'256GB', value:'256GB'});
   this.hdSize.push({label:'320GB', value:'320GB'});
   this.hdSize.push({label:'500GB', value:'500GB'});
   this.hdSize.push({label:'512GB', value:'512GB'});
   this.hdSize.push({label:'650GB', value:'650GB'});
   this.hdSize.push({label:'1TB', value:'1TB'});
   this.hdSize.push({label:'2TB', value:'2TB'});
   this.hdSize.push({label:'3TB', value:'3TB'});
   this.hdSize.push({label:'4TB', value:'4TB'});

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
 let title:String =''+posted.condition+' '+posted.brand+' '+posted.hdType+ ' hard drive';

 //Search
 let search:String  = ''+posted.brand+ ' '+posted.condition+' '+posted.hdSize+' '+posted.hdType+'  hard drive';

 let harddrive:HardDrive ={
  brand:posted.brand,   
  hdtype:posted.hdType,
  size:posted.hdSize   
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
   hardDrive:harddrive,
   screen:null,
   keyboard:null,
   charger:null,
   graphicsCard:null,
   processor:null,
   motherBoard:null,
   ram:null
  }

 let item:Item ={
   id:this.getId(posted.brand,posted.hdType),
   brand:posted.brand,
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
