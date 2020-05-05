import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AwsService } from '../service/aws.service';
import { Post } from '../classes/post';
import { GraphicsCard } from '../classes/graphicscard';
import { Peripheral } from '../classes/Peripheral';
import { Item } from '../classes/item';
;

@Component({
  selector: 'app-graphicscard',
  templateUrl: './graphicscard.component.html',
  providers: [MessageService],
  styleUrls: ['./graphicscard.component.css']
})
export class GraphicscardComponent implements OnInit {
  userform: FormGroup;
  //New USed
  condition: SelectItem[];
  //Graphics Card 
  graphicsBrand: SelectItem[]; 
  graphicsModel: SelectItem[]; 
  graphicsSize: SelectItem[]; 
  graphicsMemory: SelectItem[];
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
      'graphicsBrand': new FormControl('', Validators.required),
      'graphicsModel': new FormControl('', Validators.required),
      'graphicsSize': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'graphicsMemory': new FormControl('', Validators.required)
  });

   //Graphics Brand
   this.graphicsBrand = [];
   this.graphicsBrand.push({label:'Brand', value:''});
   this.graphicsBrand.push({label:'Amd', value:'Amd'});
   this.graphicsBrand.push({label:'Nvidia', value:'Nvidia'});
 
   //initial graphics Model
   this.graphicsModel = [];
   this.graphicsModel.push({label:'Model', value:''});
 
 
   //Graphics Size
   this.graphicsSize = [];
   this.graphicsSize.push({label:'Dedicated', value:''});
   this.graphicsSize.push({label:'64MB', value:'64MB'});
   this.graphicsSize.push({label:'128MB', value:'128MB'});
   this.graphicsSize.push({label:'256MB', value:'256MB'});
   this.graphicsSize.push({label:'512MB', value:'512MB'});
   this.graphicsSize.push({label:'1GB', value:'1GB'});
   this.graphicsSize.push({label:'1.5GB', value:'1.5GB'});
   this.graphicsSize.push({label:'2GB', value:'2GB'});
   this.graphicsSize.push({label:'3GB', value:'3GB'});
   this.graphicsSize.push({label:'4GB', value:'4GB'});
   this.graphicsSize.push({label:'6GB', value:'6GB'});
   this.graphicsSize.push({label:'8GB', value:'8GB'});
   this.graphicsSize.push({label:'16GB', value:'16GB'});
 
   //Graphics Memory
   this.graphicsMemory = [];
   this.graphicsMemory.push({label:'Memory', value:''});
   this.graphicsMemory.push({label:'DDR2', value:'DDR2'});
   this.graphicsMemory.push({label:'DDR3', value:'DDR3'});
   this.graphicsMemory.push({label:'DDR5', value:'DDR5'});
   this.graphicsMemory.push({label:'DDR6', value:'DDR6'});

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition', value:''});
   this.condition.push({label:'New', value:'New'});
   this.condition.push({label:'Used', value:'Used'});       

  }


  onChangeGraphicsBrand($event){
  
      this.graphicsModel = [];
      this.graphicsModel.push({label:'Model', value:''});
      if(this.userform.get('graphicsBrand').value === 'Amd'){
        this.graphicsModel.push({label:'Radeon FX', value:'Radeon FX'});
        this.graphicsModel.push({label:'Radeon RX 480', value:'Radeon RX 480'});
        this.graphicsModel.push({label:'Radeon VII', value:'Radeon VII'});
        this.graphicsModel.push({label:'Radeon R9 Fury X', value:'Radeon R9 Fury X'});
        this.graphicsModel.push({label:'Radeon RX 5500 XT', value:'Radeon RX 5500 XT'});
        this.graphicsModel.push({label:'Radeon RX 5600 XT', value:'Radeon RX 5600 XT'});
        this.graphicsModel.push({label:'Radeon RX 5700 XT', value:'Radeon RX 5700 XT'});
        this.graphicsModel.push({label:'Radeon RX 5700', value:'Radeon RX 5700'});
        this.graphicsModel.push({label:'Radeon RX 590', value:'Radeon RX 590'});
        this.graphicsModel.push({label:'Radeon R9 Fury', value:'Radeon R9 Fury'});
        this.graphicsModel.push({label:'Radeon R9 Fury Nano', value:'Radeon R9 Fury Nano'});
        this.graphicsModel.push({label:'Radeon R9 390X', value:'Radeon R9 390X'});
        this.graphicsModel.push({label:'Radeon R9 380X', value:'Radeon R9 380X'});
        this.graphicsModel.push({label:'Radeon R9 290X', value:'Radeon R9 290X'});
        this.graphicsModel.push({label:'Radeon R9 280X', value:'Radeon R9 280X'});
        this.graphicsModel.push({label:'Radeon R9 270X', value:'Radeon R9 270X'});
        this.graphicsModel.push({label:'Radeon R7 260X', value:'Radeon R7 260X'});
        this.graphicsModel.push({label:'Radeon R7 250X', value:'Radeon R7 250X'});
        this.graphicsModel.push({label:'Radeon R9 390', value:'Radeon R9 390'});
        this.graphicsModel.push({label:'Radeon R9 380', value:'Radeon R9 380'});
        this.graphicsModel.push({label:'Radeon R9 290', value:'Radeon R9 290'});
        this.graphicsModel.push({label:'Radeon R9 280', value:'Radeon R9 280'});
        this.graphicsModel.push({label:'Radeon R9 270', value:'Radeon R9 270'});
        this.graphicsModel.push({label:'Radeon R7 370', value:'Radeon R7 370'});
        this.graphicsModel.push({label:'Radeon R7 360', value:'Radeon R7 360'});
        this.graphicsModel.push({label:'Radeon R7 260', value:'Radeon R7 260'});
        this.graphicsModel.push({label:'Radeon R7 250', value:'Radeon R7 250'});
        this.graphicsModel.push({label:'Radeon R7 240', value:'Radeon R7 240'});
        this.graphicsModel.push({label:'Radeon RX 580', value:'Radeon RX 580'});
        this.graphicsModel.push({label:'Radeon RX 570', value:'Radeon RX 570'});
        this.graphicsModel.push({label:'Radeon RX 560', value:'Radeon RX 560'});
        this.graphicsModel.push({label:'Radeon RX 550', value:'Radeon RX 550'});
        this.graphicsModel.push({label:'Radeon RX 470', value:'Radeon RX 470'});
        this.graphicsModel.push({label:'HD 7950', value:'HD 7950'});
        this.graphicsModel.push({label:'HD 7870', value:'HD 7870'});
        this.graphicsModel.push({label:'HD 7850', value:'HD 7850'});
        this.graphicsModel.push({label:'HD 6970', value:'HD 6970'});
        this.graphicsModel.push({label:'HD 6950', value:'HD 6950'});
        this.graphicsModel.push({label:'HD 5870', value:'HD 5870'});
        this.graphicsModel.push({label:'HD 7790', value:'HD 7790'});
        this.graphicsModel.push({label:'HD 6870', value:'HD 6870'});
        this.graphicsModel.push({label:'HD 5850', value:'HD 5850'});
        this.graphicsModel.push({label:'HD 7770', value:'HD 7770'});
        this.graphicsModel.push({label:'HD 6850', value:'HD 6850'});
        this.graphicsModel.push({label:'HD 7750', value:'HD 7750'});
        this.graphicsModel.push({label:'HD 6770', value:'HD 6770'});
        this.graphicsModel.push({label:'HD 5770', value:'HD 5770'});
        this.graphicsModel.push({label:'HD 6970', value:'HD 6970'});
        this.graphicsModel.push({label:'HD 6570', value:'HD 6570'});
        this.graphicsModel.push({label:'HD 5670', value:'HD 5670'});
        this.graphicsModel.push({label:'HD 5550', value:'HD 5550'});
        this.graphicsModel.push({label:'Radeon Vega 3', value:'Radeon Vega 3'});
        this.graphicsModel.push({label:'Radeon Vega 8', value:'Radeon Vega 8'});
        this.graphicsModel.push({label:'Radeon Vega 11', value:'Radeon Vega 11'});
        this.graphicsModel.push({label:'Radeon Vega 56', value:'Radeon Vega 56'});
        this.graphicsModel.push({label:'Radeon Vega 64', value:'Radeon Vega 64'});
      }
      else if(this.userform.get('graphicsBrand').value === 'Nvidia'){
        this.graphicsModel.push({label:'GTX 580M', value:'GTX 580M'});
        this.graphicsModel.push({label:'GTX 680M', value:'GTX 680M'});
        this.graphicsModel.push({label:'GTX 860M', value:'GTX 860M'});
        this.graphicsModel.push({label:'GTX 950M', value:'GTX 960M'});
        this.graphicsModel.push({label:'GTX 970M', value:'GTX 970M'});
        this.graphicsModel.push({label:'GT 730', value:'GT 730'});
        this.graphicsModel.push({label:'GT 640', value:'GT 640'});
        this.graphicsModel.push({label:'GT 740', value:'GT 740'});
        this.graphicsModel.push({label:'GT 650', value:'GT 650'});
        this.graphicsModel.push({label:'GTX 550 Ti', value:'GTX 550 Ti'});
        this.graphicsModel.push({label:'GTX 460', value:'GTX 460'});
        this.graphicsModel.push({label:'GTX 560', value:'GTX 560'});
        this.graphicsModel.push({label:'GT 1030', value:'GT 1030'});
        this.graphicsModel.push({label:'GTX 650 Ti', value:'GTX 650 Ti'});
        this.graphicsModel.push({label:'GTX 750 Ti', value:'GTX 750 Ti'});
        this.graphicsModel.push({label:'GTX 470', value:'GTX 470'});
        this.graphicsModel.push({label:'GTX 560 Ti', value:'GTX 560 Ti'});
        this.graphicsModel.push({label:'GTX 750', value:'GTX 750'});
        this.graphicsModel.push({label:'GTX 750 Ti', value:'GTX 750 Ti'});
        this.graphicsModel.push({label:'GTX 480', value:'GTX 480'});
        this.graphicsModel.push({label:'GTX 570', value:'GTX 570'});
        this.graphicsModel.push({label:'GTX 660', value:'GTX 660'});
        this.graphicsModel.push({label:'GTX 580', value:'GTX 580'});
        this.graphicsModel.push({label:'GTX 660 Ti', value:'GTX 660 Ti'});
        this.graphicsModel.push({label:'GTX 760', value:'GTX 760'});
        this.graphicsModel.push({label:'GTX 950', value:'GTX 950'});
        this.graphicsModel.push({label:'GTX 670', value:'GTX 670'});
        this.graphicsModel.push({label:'GTX 960', value:'GTX 960'});
        this.graphicsModel.push({label:'GTX 1050', value:'GTX 1050'});
        this.graphicsModel.push({label:'GTX 1050 Ti', value:'GTX 1050 Ti'});
        this.graphicsModel.push({label:'GTX 680', value:'GTX 680'});
        this.graphicsModel.push({label:'GTX 770', value:'GTX 770'});
        this.graphicsModel.push({label:'GTX 1650', value:'GTX 1650'});
        this.graphicsModel.push({label:'GTX 780', value:'GTX 780'});
        this.graphicsModel.push({label:'GTX 780 Ti', value:'GTX 780 Ti'});
        this.graphicsModel.push({label:'GTX 970', value:'GTX 970'});
        this.graphicsModel.push({label:'GTX 1060', value:'GTX 1060'});
        this.graphicsModel.push({label:'GTX 980', value:'GTX 980'});
        this.graphicsModel.push({label:'GTX 1660', value:'GTX 1660'});
        this.graphicsModel.push({label:'GTX 980 Ti', value:'GTX 980 Ti'});
        this.graphicsModel.push({label:'GTX Titan X', value:'GTX Titan X'});
        this.graphicsModel.push({label:'GTX 1660 Ti', value:'GTX 1660 Ti'});
        this.graphicsModel.push({label:'GTX 1070', value:'GTX 1070'});
        this.graphicsModel.push({label:'GTX 1070 Ti', value:'GTX 1070 Ti'});
        this.graphicsModel.push({label:'GTX 1080 Ti', value:'GTX 1080 Ti'});
        this.graphicsModel.push({label:'GTX 1080', value:'GTX 1080'});
        this.graphicsModel.push({label:'RTX 2060', value:'RTX 2060'});
        this.graphicsModel.push({label:'RTX 2060 Ti', value:'RTX 2060 Ti'});
        this.graphicsModel.push({label:'RTX 2070', value:'RTX 2070'});
        this.graphicsModel.push({label:'RTX 2070 Ti', value:'RTX 2070 Ti'});
        this.graphicsModel.push({label:'RTX 2080 Ti', value:'RTX 2080 Ti'});
        this.graphicsModel.push({label:'RTX 2080', value:'RTX 2080'});
      }
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
   let title:String = posted.condition+' '+posted.graphicsBrand+' '+posted.graphicsModel+ ' graphics Card';
 
   //Search
   let search:String  = ''+posted.graphicsBrand+ ' '+posted.graphicsModel+' '+posted.condition+' '+posted.graphicsMemory+' '+posted.graphicsSize+' graphics card';
 
   let graphicscard:GraphicsCard ={
    brand:posted.graphicsBrand,  
    model:posted.graphicsModel,
    size:posted.graphicsSize,
    ram:posted.graphicsMemory
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
     graphicsCard:graphicscard,
     processor:null,
     motherBoard:null,
     ram:null
    }
 
   let item:Item ={
     id:this.getId(posted.graphicsBrand,posted.graphicsModel),
     brand:posted.graphicsBrand,
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
