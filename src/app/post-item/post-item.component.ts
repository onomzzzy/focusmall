import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AwsService } from '../service/aws.service';
import { ItemService } from '../service/item.service';
import { Display } from '../classes/screen';
import { Proccessor } from '../classes/processor';
import { GraphicsCard } from '../classes/graphicscard';
import { HardDrive } from '../classes/hd';
import { Ram } from '../classes/ram';
import { Battery } from '../classes/battery';
import { Laptop } from '../classes/laptop';
import { Item } from '../classes/item';
import { Post} from '../classes/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  providers: [MessageService],
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  userform: FormGroup;
  //PC
  brand: SelectItem[];
  processorBrand: SelectItem[]; 
  processorModel: SelectItem[]; 
  processorGen: SelectItem[]; 
  processorCore: SelectItem[]; 
  processorSpeed: SelectItem[]; 
  //Graphics Card 
  graphicsBrand: SelectItem[]; 
  graphicsModel: SelectItem[]; 
  graphicsSize: SelectItem[]; 
  graphicsMemory: SelectItem[];


  //Screen Size
  screenSize: SelectItem[];
  screenDisplay: SelectItem[];

  //For Dual Graphics
  graphics: SelectItem[];
  secondGraphicsCard:boolean = false;
  graphicsBrand1: SelectItem[]; 
  graphicsModel1: SelectItem[]; 
  graphicsSize1: SelectItem[]; 
  graphicsMemory1: SelectItem[];

  //Hard Drive
  hdNo:SelectItem[];
  selectedHD:number = 0;
  hdBrand: SelectItem[]; 
  hdType: SelectItem[]; 
  hdSize: SelectItem[];
  
  //Hard Drive 1
  hdBrand1: SelectItem[]; 
  hdType1: SelectItem[]; 
  hdSize1: SelectItem[];

  //Hard Drive 2
  hdBrand2: SelectItem[]; 
  hdType2: SelectItem[]; 
  hdSize2: SelectItem[];

  //Hard Drive 3
  hdBrand3: SelectItem[]; 
  hdType3: SelectItem[]; 
  hdSize3: SelectItem[];


  //Ram
  ramBrand: SelectItem[]; 
  ramType: SelectItem[]; 
  ramSize: SelectItem[];

  //battery
  cells : SelectItem[];

  //Condition
  condition : SelectItem[];

  autoDes: boolean = false;

  //List of Pictures
  pix:String ='../../assets/images/icons/image.png';
  pix1:String ='../../assets/images/icons/image.png';
  pix2:String ='../../assets/images/icons/image.png';
  pix3:String ='../../assets/images/icons/image.png';
  //PC
  constructor(private fb: FormBuilder,private messageService:MessageService,private aws:AwsService,private it:ItemService) { 
  this.it.getStoreItems("FocusMal")
  .subscribe((data)=>{
    console.log(' from libe '+JSON.stringify(data))
  },
  error =>{
    console.log('Error occured while trying to get ');
  } // error path
  );
  
  }

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
      'brand': new FormControl('', Validators.required),
      'model': new FormControl('', Validators.required),
      'condition': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'screenSize': new FormControl('', Validators.required),
      'screenDisplay': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required,Validators.maxLength(3)]),
      'quantity': new FormControl('', [Validators.required,Validators.min(1)]),
      'description': new FormControl(''),
      'discount': new FormControl('', Validators.required),
      'processorBrand': new FormControl('', Validators.required),
      'processorModel': new FormControl('', Validators.required),
      'processorCore': new FormControl('', Validators.required),
      'processorGen': new FormControl('', Validators.required),
      'graphics': new FormControl('', Validators.required),
      'graphicsBrand': new FormControl('', Validators.required),
      'graphicsModel': new FormControl('', Validators.required),
      'graphicsMemory': new FormControl('',Validators.required),
      'graphicsSize': new FormControl('',Validators.required),
      'graphicsBrand1': new FormControl(''),
      'graphicsModel1': new FormControl(''),
      'graphicsSize1': new FormControl(''),
      'graphicsMemory1': new FormControl(''),
      'processorSpeed': new FormControl('', Validators.required),
      'hdNo': new FormControl('', Validators.required),
      'hdBrand': new FormControl('', Validators.required),
      'hdType': new FormControl('', Validators.required),
      'hdSize': new FormControl('', Validators.required),
      'hdBrand1': new FormControl(''),
      'hdType1': new FormControl(''),
      'hdSize1': new FormControl(''),
      'ramBrand': new FormControl(''),
      'hdBrand2': new FormControl(''),
      'hdType2': new FormControl(''),
      'hdSize2': new FormControl(''),
      'hdBrand3': new FormControl(''),
      'hdType3': new FormControl(''),
      'hdSize3': new FormControl(''),
      'ramType': new FormControl('', Validators.required),
      'ramSize': new FormControl('', Validators.required),
      'cells': new FormControl('', Validators.required),
      'power': new FormControl('', Validators.required),
      'duration': new FormControl('', Validators.required)
  });

  //Brand
  this.brand = [];
        this.brand.push({label:'Select Brand', value:''});
        this.brand.push({label:'Acer', value:'Acer'});
        this.brand.push({label:'Asus', value:'Asus'}); 
        this.brand.push({label:'Apple', value:'Apple'});
        this.brand.push({label:'Clevo', value:'Clevo'});
        this.brand.push({label:'Dell', value:'Dell'});
        this.brand.push({label:'Fujitsu', value:'Fujitsu'});
        this.brand.push({label:'Gigabyte', value:'Gigabyte'});
        this.brand.push({label:'Google', value:'Google'});
        this.brand.push({label:'Hp', value:'Hp'}); 
        this.brand.push({label:'Huawei', value:'Huawei'});
        this.brand.push({label:'Iball', value:'Iball'}); 
        this.brand.push({label:'LG', value:'LG'});
        this.brand.push({label:'Medion', value:'Medion'});
        this.brand.push({label:'Microsoft', value:'Microsoft'});
        this.brand.push({label:'Panasonic', value:'Panasonic'});
        this.brand.push({label:'Razer', value:'Razer'});
        this.brand.push({label:'Samsung', value:'Samsung'});
        this.brand.push({label:'Sony Vaio', value:'Sony Vaio'});
        this.brand.push({label:'Toshiba', value:'Toshiba'});
        this.brand.push({label:'Xiaomi', value:'Xiaomi'});           


  //Screen Size
  this.screenSize = [];
   this.screenSize.push({label:'Screen Size',value:''});
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
   
   
   //Screen Display
   this.screenDisplay = [];
   this.screenDisplay.push({label:'Select Display Type',value:''});
   this.screenDisplay.push({label:'LCD',value:'LCD'});
   this.screenDisplay.push({label:'LED',value:'LED'});
   this.screenDisplay.push({label:'IPS',value:'IPS'});

   //Condition
   this.condition = [];
   this.condition.push({label:'Select Condition',value:''});
   this.condition.push({label:'New',value:'New'});
   this.condition.push({label:'Used',value:'Used'});
   this.condition.push({label:'For Part',value:'For Part'});

        
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


   //Graphics card
   this.graphics = [];
  this.graphics.push({label:'Graphics Card', value:''});
  this.graphics.push({label:'Single graphics ', value:'Single graphics card'});
  this.graphics.push({label:'Dual graphics ', value:'Dual graphics card'});

  //Graphics Brand
  this.graphicsBrand = [];
  this.graphicsBrand.push({label:'Brand', value:''});
  this.graphicsBrand.push({label:'Amd', value:'Amd'});
  this.graphicsBrand.push({label:'Intel', value:'Intel'});
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



  //Graphics Brand
  this.graphicsBrand1 = [];
  this.graphicsBrand1.push({label:'Brand', value:''});
  this.graphicsBrand1.push({label:'Amd', value:'Amd'});
  this.graphicsBrand1.push({label:'Intel', value:'Intel'});
  this.graphicsBrand1.push({label:'Nvidia', value:'Nvidia'});

  //initial graphics Model
  this.graphicsModel1 = [];
  this.graphicsModel1.push({label:'Model', value:''});


  //Graphics Size
  this.graphicsSize1 = [];
  this.graphicsSize1.push({label:'Dedicated', value:''});
  this.graphicsSize1.push({label:'64MB', value:'64MB'});
  this.graphicsSize1.push({label:'128MB', value:'128MB'});
  this.graphicsSize1.push({label:'256MB', value:'256MB'});
  this.graphicsSize1.push({label:'512MB', value:'512MB'});
  this.graphicsSize1.push({label:'1GB', value:'1GB'});
  this.graphicsSize1.push({label:'1.5GB', value:'1.5GB'});
  this.graphicsSize1.push({label:'2GB', value:'2GB'});
  this.graphicsSize1.push({label:'3GB', value:'3GB'});
  this.graphicsSize1.push({label:'4GB', value:'4GB'});
  this.graphicsSize1.push({label:'6GB', value:'6GB'});
  this.graphicsSize1.push({label:'8GB', value:'8GB'});
  this.graphicsSize1.push({label:'16GB', value:'16GB'});

  //Graphics Memory
  this.graphicsMemory1 = [];
  this.graphicsMemory1.push({label:'Memory', value:''});
  this.graphicsMemory1.push({label:'DDR2', value:'DDR2'});
  this.graphicsMemory1.push({label:'DDR3', value:'DDR3'});
  this.graphicsMemory1.push({label:'DDR5', value:'DDR5'});
  this.graphicsMemory1.push({label:'DDR6', value:'DDR6'});

  //Hard Drive Brand
  this.hdNo = [];
  this.hdNo.push({label:'Select No of Hard Drive',value:''});
  this.hdNo.push({label:'1',value:'1'});
  this.hdNo.push({label:'2',value:'2'});
  this.hdNo.push({label:'3',value:'3'});
  this.hdNo.push({label:'4',value:'4'});
  

   //Hard Drive Brand
   this.hdBrand = [];
   this.hdBrand.push({label:'Brand', value:''});
   this.hdBrand.push({label:'Adata', value:'Adata'});
   this.hdBrand.push({label:'Apple', value:'Apple'});
   this.hdBrand.push({label:'Hitachi', value:'Hatachi'});
   this.hdBrand.push({label:'Hp', value:'Hp'});
   this.hdBrand.push({label:'Intel', value:'Intel'});
   this.hdBrand.push({label:'Kingston', value:'Kingston'});
   this.hdBrand.push({label:'Mushikin', value:'Mushikin'});
   this.hdBrand.push({label:'Samsung', value:'Samsung'});
   this.hdBrand.push({label:'Sandisk', value:'Sandisk'});
   this.hdBrand.push({label:'Seagate', value:'Seagate'});
   this.hdBrand.push({label:'Sony', value:'Sony'});
   this.hdBrand.push({label:'Toshiba', value:'Toshiba'});
   this.hdBrand.push({label:'Transcend', value:'Transcend'});
   this.hdBrand.push({label:'WD', value:'WD'});

   //Hard Drive Type
   this.hdType = [];
   this.hdType.push({label:'Type', value:''});
   this.hdType.push({label:'HDD', value:'HDD'});
   this.hdType.push({label:'SSD', value:'SSD'});
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


    //Hard Drive Brand 1
    this.hdBrand1 = [];
    this.hdBrand1.push({label:'Brand', value:''});
    this.hdBrand1.push({label:'Adata', value:'Adata'});
    this.hdBrand1.push({label:'Apple', value:'Apple'});
    this.hdBrand1.push({label:'Hitachi', value:'Hatachi'});
    this.hdBrand1.push({label:'Hp', value:'Hp'});
    this.hdBrand1.push({label:'Intel', value:'Intel'});
    this.hdBrand1.push({label:'Kingston', value:'Kingston'});
    this.hdBrand1.push({label:'Mushikin', value:'Mushikin'});
    this.hdBrand1.push({label:'Samsung', value:'Samsung'});
    this.hdBrand1.push({label:'Sandisk', value:'Sandisk'});
    this.hdBrand1.push({label:'Seagate', value:'Seagate'});
    this.hdBrand1.push({label:'Sony', value:'Sony'});
    this.hdBrand1.push({label:'Toshiba', value:'Toshiba'});
    this.hdBrand1.push({label:'Transcend', value:'Transcend'});
    this.hdBrand1.push({label:'WD', value:'WD'});
 
    //Hard Drive Type
    this.hdType1 = [];
    this.hdType1.push({label:'Type', value:''});
    this.hdType1.push({label:'HDD', value:'HDD'});
    this.hdType1.push({label:'SSD', value:'SSD'});
    this.hdType1.push({label:'M.2', value:'M.2 SSD'});
    this.hdType1.push({label:'NVMe', value:'NVMe SSD'});
 
    //Hard Drive Size 1
    this.hdSize1 = [];
    this.hdSize1.push({label:'Size', value:''});
    this.hdSize1.push({label:'32GB', value:'32GB'});
    this.hdSize1.push({label:'40GB', value:'40GB'});
    this.hdSize1.push({label:'60GB', value:'60GB'});
    this.hdSize1.push({label:'64GB', value:'64GB'});
    this.hdSize1.push({label:'80GB', value:'80GB'});
    this.hdSize1.push({label:'120GB', value:'120GB'});
    this.hdSize1.push({label:'128GB', value:'128GB'});
    this.hdSize1.push({label:'250GB', value:'250GB'});
    this.hdSize1.push({label:'256GB', value:'256GB'});
    this.hdSize1.push({label:'320GB', value:'320GB'});
    this.hdSize1.push({label:'500GB', value:'500GB'});
    this.hdSize1.push({label:'512GB', value:'512GB'});
    this.hdSize1.push({label:'650GB', value:'650GB'});
    this.hdSize1.push({label:'1TB', value:'1TB'});
    this.hdSize1.push({label:'2TB', value:'2TB'});
    this.hdSize1.push({label:'3TB', value:'3TB'});
    this.hdSize1.push({label:'4TB', value:'4TB'});


  //Hard Drive Brand 2
  this.hdBrand2 = [];
  this.hdBrand2.push({label:'Brand', value:''});
  this.hdBrand2.push({label:'Adata', value:'Adata'});
  this.hdBrand2.push({label:'Apple', value:'Apple'});
  this.hdBrand2.push({label:'Hitachi', value:'Hatachi'});
  this.hdBrand2.push({label:'Hp', value:'Hp'});
  this.hdBrand2.push({label:'Intel', value:'Intel'});
  this.hdBrand2.push({label:'Kingston', value:'Kingston'});
  this.hdBrand2.push({label:'Mushikin', value:'Mushikin'});
  this.hdBrand2.push({label:'Samsung', value:'Samsung'});
  this.hdBrand2.push({label:'Sandisk', value:'Sandisk'});
  this.hdBrand2.push({label:'Seagate', value:'Seagate'});
  this.hdBrand2.push({label:'Sony', value:'Sony'});
  this.hdBrand2.push({label:'Toshiba', value:'Toshiba'});
  this.hdBrand2.push({label:'Transcend', value:'Transcend'});
  this.hdBrand2.push({label:'WD', value:'WD'});

   //Hard Drive Type 2
   this.hdType2 = [];
   this.hdType2.push({label:'Type', value:''});
   this.hdType2.push({label:'HDD', value:'HDD'});
   this.hdType2.push({label:'SSD', value:'SSD'});
   this.hdType2.push({label:'M.2', value:'M.2 SSD'});
   this.hdType2.push({label:'NVMe', value:'NVMe SSD'});

   //Hard Drive Size 2
   this.hdSize2 = [];
   this.hdSize2.push({label:'Size', value:''});
   this.hdSize2.push({label:'32GB', value:'32GB'});
   this.hdSize2.push({label:'40GB', value:'40GB'});
   this.hdSize2.push({label:'60GB', value:'60GB'});
   this.hdSize2.push({label:'64GB', value:'64GB'});
   this.hdSize2.push({label:'80GB', value:'80GB'});
   this.hdSize2.push({label:'120GB', value:'120GB'});
   this.hdSize2.push({label:'128GB', value:'128GB'});
   this.hdSize2.push({label:'250GB', value:'250GB'});
   this.hdSize2.push({label:'256GB', value:'256GB'});
   this.hdSize2.push({label:'320GB', value:'320GB'});
   this.hdSize2.push({label:'500GB', value:'500GB'});
   this.hdSize2.push({label:'512GB', value:'512GB'});
   this.hdSize2.push({label:'650GB', value:'650GB'});
   this.hdSize2.push({label:'1TB', value:'1TB'});
   this.hdSize2.push({label:'2TB', value:'2TB'});
   this.hdSize2.push({label:'3TB', value:'3TB'});
   this.hdSize2.push({label:'4TB', value:'4TB'});


    //Hard Drive Brand 3
    this.hdBrand3 = [];
    this.hdBrand3.push({label:'Brand', value:''});
    this.hdBrand3.push({label:'Adata', value:'Adata'});
    this.hdBrand3.push({label:'Apple', value:'Apple'});
    this.hdBrand3.push({label:'Hitachi', value:'Hatachi'});
    this.hdBrand3.push({label:'Hp', value:'Hp'});
    this.hdBrand3.push({label:'Intel', value:'Intel'});
    this.hdBrand3.push({label:'Kingston', value:'Kingston'});
    this.hdBrand3.push({label:'Mushikin', value:'Mushikin'});
    this.hdBrand3.push({label:'Samsung', value:'Samsung'});
    this.hdBrand3.push({label:'Sandisk', value:'Sandisk'});
    this.hdBrand3.push({label:'Seagate', value:'Seagate'});
    this.hdBrand3.push({label:'Sony', value:'Sony'});
    this.hdBrand3.push({label:'Toshiba', value:'Toshiba'});
    this.hdBrand3.push({label:'Transcend', value:'Transcend'});
    this.hdBrand3.push({label:'WD', value:'WD'});
    //Hard Drive Type
    this.hdType3 = [];
    this.hdType3.push({label:'Type', value:''});
    this.hdType3.push({label:'HDD', value:'HDD'});
    this.hdType3.push({label:'SSD', value:'SSD'});
    this.hdType3.push({label:'M.2', value:'M.2 SSD'});
    this.hdType3.push({label:'NVMe', value:'NVMe SSD'});
 
    //Hard Drive Size
    this.hdSize3 = [];
    this.hdSize3.push({label:'Size', value:''});
    this.hdSize3.push({label:'32GB', value:'32GB'});
    this.hdSize3.push({label:'40GB', value:'40GB'});
    this.hdSize3.push({label:'60GB', value:'60GB'});
    this.hdSize3.push({label:'64GB', value:'64GB'});
    this.hdSize3.push({label:'80GB', value:'80GB'});
    this.hdSize3.push({label:'120GB', value:'120GB'});
    this.hdSize3.push({label:'128GB', value:'128GB'});
    this.hdSize3.push({label:'250GB', value:'250GB'});
    this.hdSize3.push({label:'256GB', value:'256GB'});
    this.hdSize3.push({label:'320GB', value:'320GB'});
    this.hdSize3.push({label:'500GB', value:'500GB'});
    this.hdSize3.push({label:'512GB', value:'512GB'});
    this.hdSize3.push({label:'650GB', value:'650GB'});
    this.hdSize3.push({label:'1TB', value:'1TB'});
    this.hdSize3.push({label:'2TB', value:'2TB'});
    this.hdSize3.push({label:'3TB', value:'3TB'});
    this.hdSize3.push({label:'4TB', value:'4TB'});

 
    //Ram Brand
    this.ramBrand = [];
    this.ramBrand.push({label:'Brand', value:''});
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

    //Battery Cells
    this.cells = [];
    this.cells.push({label:'Battery Cells', value:''});
    this.cells.push({label:'Single Cell', value:'Single Cell'});
    this.cells.push({label:'Double Cell', value:'Double Cell'});
    this.cells.push({label:'3 Cells', value:'3 Cells'});
    this.cells.push({label:'4 Cells', value:'4 Cells'});

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

  onSelectGraphics(event){
    if(this.userform.get('graphics').value === 'Dual graphics card'){ 
    this.secondGraphicsCard = true;
    }
    else{
      this.secondGraphicsCard = false;
    }
  }

  onChangeGraphicsBrand($event,card:number){
  console.log(' graphics card called '+card);
  if(card == 0){
    this.graphicsModel = [];
    this.graphicsModel.push({label:'Model', value:''});
    if(this.userform.get('graphicsBrand').value === 'Amd'){
      this.graphicsModel.push({label:'Radeon FX', value:'Radeon FX'});
      this.graphicsModel.push({label:'Radeon 620', value:'Radeon 620'});
      this.graphicsModel.push({label:'Radeon Pro WX 2100', value:'Radeon Pro WX 2100'});
      this.graphicsModel.push({label:'Radeon Pro 555', value:'Radeon Pro 555'});
      this.graphicsModel.push({label:'Radeon RX 5600M', value:'Radeon RX 5600M'});
      this.graphicsModel.push({label:'Radeon RX 560X', value:'Radeon RX 560X'});
      this.graphicsModel.push({label:'Radeon RX 280', value:'Radeon RX 280'});
      this.graphicsModel.push({label:'Radeon RX 480', value:'Radeon RX 480'});
      this.graphicsModel.push({label:'Radeon RX 580', value:'Radeon RX 580'});
      this.graphicsModel.push({label:'Radeon Vega 3', value:'Radeon Vega 3'});
      this.graphicsModel.push({label:'Radeon Vega 6', value:'Radeon Vega 6'});
      this.graphicsModel.push({label:'Radeon Vega 7', value:'Radeon Vega 7'});
      this.graphicsModel.push({label:'Radeon Vega 8', value:'Radeon Vega 8'});
      this.graphicsModel.push({label:'Radeon Vega 10', value:'Radeon Vega 10'});
      this.graphicsModel.push({label:'Radeon Vega 11', value:'Radeon Vega 11'});
      this.graphicsModel.push({label:'Radeon Vega 56', value:'Radeon Vega 56'});
      this.graphicsModel.push({label:'Radeon Vega 64', value:'Radeon Vega 64'});
      this.graphicsModel.push({label:'Radeon Vega 870', value:'Radeon Vega 870'});
    }
    else if(this.userform.get('graphicsBrand').value === 'Intel'){
      this.graphicsModel.push({label:'HD 3000', value:'HD 3000'});
      this.graphicsModel.push({label:'HD 4000', value:'HD 4000'});
      this.graphicsModel.push({label:'HD 4400', value:'HD 4400'});
      this.graphicsModel.push({label:'HD 500', value:'HD 500'});
      this.graphicsModel.push({label:'HD 510', value:'HD 510'});
      this.graphicsModel.push({label:'HD 515', value:'HD 515'});
      this.graphicsModel.push({label:'HD 500', value:'HD 520'});
      this.graphicsModel.push({label:'UHD 605', value:'UHD 605'});
      this.graphicsModel.push({label:'UHD 615', value:'UHD 615'});
      this.graphicsModel.push({label:'UHD 620', value:'UHD 620'});
      this.graphicsModel.push({label:'UHD 630', value:'UHD 630'});
      this.graphicsModel.push({label:'UHD G1', value:'UHD G1'});
      this.graphicsModel.push({label:'Iris Plus G4', value:'Iris Plus G4'});
      this.graphicsModel.push({label:'Iris Plus G7', value:'Iris Plus G7'});
    }
    else if(this.userform.get('graphicsBrand').value === 'Nvidia'){
      this.graphicsModel.push({label:'GTX 550M', value:'GTX 550M'});
      this.graphicsModel.push({label:'GTX 580M', value:'GTX 580M'});
      this.graphicsModel.push({label:'GTX 650M', value:'GTX 650M'});
      this.graphicsModel.push({label:'GTX 680M', value:'GTX 680M'});
      this.graphicsModel.push({label:'GTX 740M', value:'GTX 740M'});
      this.graphicsModel.push({label:'GTX 750M', value:'GTX 750M'});
      this.graphicsModel.push({label:'GTX 840M', value:'GTX 840M'});
      this.graphicsModel.push({label:'GTX 860M', value:'GTX 860M'});
      this.graphicsModel.push({label:'GTX 950M', value:'GTX 950M'});
      this.graphicsModel.push({label:'GTX 970M', value:'GTX 970M'});
      this.graphicsModel.push({label:'GTX 1050', value:'GTX 1050'});
      this.graphicsModel.push({label:'GTX 1050 Ti', value:'GTX 1050 Ti'});
      this.graphicsModel.push({label:'GTX 1060', value:'GTX 1060'});
      this.graphicsModel.push({label:'GTX 1070', value:'GTX 1070'});
      this.graphicsModel.push({label:'GTX 1650', value:'GTX 1650'});
      this.graphicsModel.push({label:'GTX 1660', value:'GTX 1660'});
      this.graphicsModel.push({label:'GTX 1660 Ti', value:'GTX 1660 Ti'});
      this.graphicsModel.push({label:'RTX 2060', value:'RTX 2060'});
      this.graphicsModel.push({label:'RTX 2070', value:'RTX 2070'});
      this.graphicsModel.push({label:'RTX 2080', value:'RTX 2080'});
      this.graphicsModel.push({label:'GF MX110', value:'GF MX110'});
      this.graphicsModel.push({label:'GF MX130', value:'GF MX130'});
      this.graphicsModel.push({label:'GF MX150', value:'GF MX150'});
      this.graphicsModel.push({label:'GF MX230', value:'GF MX230'});
      this.graphicsModel.push({label:'GF MX250', value:'GF MX250'});
      this.graphicsModel.push({label:'GF MX110', value:'GF MX110'});
      this.graphicsModel.push({label:'Quadro P520', value:'Quadro P520'});
      this.graphicsModel.push({label:'Quadro T2000', value:'Quadro T2000'});
      this.graphicsModel.push({label:'Quadro RTX 3000', value:'Quadro RTX 3000'});
    }
  }
  else if(card == 1){
    this.graphicsModel1 = [];
    this.graphicsModel1.push({label:'Model', value:''});
    if(this.userform.get('graphicsBrand1').value === 'Amd'){
      this.graphicsModel1.push({label:'Radeon FX', value:'Radeon FX'});
      this.graphicsModel1.push({label:'Radeon 620', value:'Radeon 620'});
      this.graphicsModel1.push({label:'Radeon Pro WX 2100', value:'Radeon Pro WX 2100'});
      this.graphicsModel1.push({label:'Radeon Pro 555', value:'Radeon Pro 555'});
      this.graphicsModel1.push({label:'Radeon RX 5600M', value:'Radeon RX 5600M'});
      this.graphicsModel1.push({label:'Radeon RX 560X', value:'Radeon RX 560X'});
      this.graphicsModel1.push({label:'Radeon RX 280', value:'Radeon RX 280'});
      this.graphicsModel1.push({label:'Radeon RX 480', value:'Radeon RX 480'});
      this.graphicsModel1.push({label:'Radeon RX 580', value:'Radeon RX 580'});
      this.graphicsModel1.push({label:'Radeon Vega 3', value:'Radeon Vega 3'});
      this.graphicsModel1.push({label:'Radeon Vega 6', value:'Radeon Vega 6'});
      this.graphicsModel1.push({label:'Radeon Vega 7', value:'Radeon Vega 7'});
      this.graphicsModel1.push({label:'Radeon Vega 8', value:'Radeon Vega 8'});
      this.graphicsModel1.push({label:'Radeon Vega 10', value:'Radeon Vega 10'});
      this.graphicsModel1.push({label:'Radeon Vega 11', value:'Radeon Vega 11'});
      this.graphicsModel1.push({label:'Radeon Vega 56', value:'Radeon Vega 56'});
      this.graphicsModel1.push({label:'Radeon Vega 64', value:'Radeon Vega 64'});
      this.graphicsModel1.push({label:'Radeon Vega 870', value:'Radeon Vega 870'});
    }
    else if(this.userform.get('graphicsBrand1').value === 'Intel'){
      this.graphicsModel1.push({label:'HD 3000', value:'HD 3000'});
      this.graphicsModel1.push({label:'HD 4000', value:'HD 4000'});
      this.graphicsModel1.push({label:'HD 4400', value:'HD 4400'});
      this.graphicsModel1.push({label:'HD 500', value:'HD 500'});
      this.graphicsModel1.push({label:'HD 510', value:'HD 510'});
      this.graphicsModel1.push({label:'HD 515', value:'HD 515'});
      this.graphicsModel1.push({label:'HD 500', value:'HD 520'});
      this.graphicsModel1.push({label:'UHD 605', value:'UHD 605'});
      this.graphicsModel1.push({label:'UHD 615', value:'UHD 615'});
      this.graphicsModel1.push({label:'UHD 620', value:'UHD 620'});
      this.graphicsModel1.push({label:'UHD 630', value:'UHD 630'});
      this.graphicsModel1.push({label:'UHD G1', value:'UHD G1'});
      this.graphicsModel1.push({label:'Iris Plus G4', value:'Iris Plus G4'});
      this.graphicsModel1.push({label:'Iris Plus G7', value:'Iris Plus G7'});
    }
    else if(this.userform.get('graphicsBrand1').value === 'Nvidia'){
      this.graphicsModel1.push({label:'GTX 550M', value:'GTX 550M'});
      this.graphicsModel1.push({label:'GTX 580M', value:'GTX 580M'});
      this.graphicsModel1.push({label:'GTX 650M', value:'GTX 650M'});
      this.graphicsModel1.push({label:'GTX 680M', value:'GTX 680M'});
      this.graphicsModel1.push({label:'GTX 740M', value:'GTX 740M'});
      this.graphicsModel1.push({label:'GTX 750M', value:'GTX 750M'});
      this.graphicsModel1.push({label:'GTX 840M', value:'GTX 840M'});
      this.graphicsModel1.push({label:'GTX 860M', value:'GTX 860M'});
      this.graphicsModel1.push({label:'GTX 950M', value:'GTX 950M'});
      this.graphicsModel1.push({label:'GTX 970M', value:'GTX 970M'});
      this.graphicsModel1.push({label:'GTX 1050', value:'GTX 1050'});
      this.graphicsModel1.push({label:'GTX 1050 Ti', value:'GTX 1050 Ti'});
      this.graphicsModel1.push({label:'GTX 1060', value:'GTX 1060'});
      this.graphicsModel1.push({label:'GTX 1070', value:'GTX 1070'});
      this.graphicsModel1.push({label:'GTX 1650', value:'GTX 1650'});
      this.graphicsModel1.push({label:'GTX 1660', value:'GTX 1660'});
      this.graphicsModel1.push({label:'GTX 1660 Ti', value:'GTX 1660 Ti'});
      this.graphicsModel1.push({label:'RTX 2060', value:'RTX 2060'});
      this.graphicsModel1.push({label:'RTX 2070', value:'RTX 2070'});
      this.graphicsModel1.push({label:'RTX 2080', value:'RTX 2080'});
      this.graphicsModel1.push({label:'GF MX110', value:'GF MX110'});
      this.graphicsModel1.push({label:'GF MX130', value:'GF MX130'});
      this.graphicsModel1.push({label:'GF MX150', value:'GF MX150'});
      this.graphicsModel1.push({label:'GF MX230', value:'GF MX230'});
      this.graphicsModel1.push({label:'GF MX250', value:'GF MX250'});
      this.graphicsModel1.push({label:'GF MX110', value:'GF MX110'});
      this.graphicsModel1.push({label:'Quadro P520', value:'Quadro P520'});
      this.graphicsModel1.push({label:'Quadro T2000', value:'Quadro T2000'});
      this.graphicsModel1.push({label:'Quadro RTX 3000', value:'Quadro RTX 3000'});
    }
  }

  }

  onHD(event){
  if(this.userform.get('hdNo').value === '1'){
  this.selectedHD = 1;
  }
  else if(this.userform.get('hdNo').value === '2'){
  this.selectedHD = 2;
  }
  else if(this.userform.get('hdNo').value === '3'){
    this.selectedHD = 3;
  }
  else if(this.userform.get('hdNo').value === '4'){
    this.selectedHD = 4;
  }
  else{
    this.selectedHD = 0;
  }

  }

  onUpload(event,no:number){
    let selecetdFile:File = event.target.files[0];
    this.aws.uploadPicture(selecetdFile,selecetdFile.name,no);
  }


  handleChange(e) {
    if(e.checked){
      this.autoDes = true;
    }
    else{
      this.autoDes = false
    }
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
      //Error List
      let errorList:String[] = [];
      //Create Screen
      let screen:Display ={
        size:this.userform.get('screenSize').value,
        displaytype:null,
        displaykind:this.userform.get('screenDisplay').value
      }
    
      let posted:Post = JSON.parse(JSON.stringify(this.userform.value));
    
      //create Processor
      let processor:Proccessor ={
        brand:this.userform.get('processorBrand').value,
        model:this.userform.get('processorModel').value,
        speed:this.userform.get('processorSpeed').value+'GHZ',
        turboSpeed:null,
        generation:this.userform.get('processorGen').value,
        core:this.userform.get('processorCore').value,
      }
      
      
      //graphics Card
      let gpus:GraphicsCard[] = [];
      let gpu:GraphicsCard ={
        brand:this.userform.get('graphicsBrand').value,
        model:this.userform.get('graphicsModel').value,
        size:this.userform.get('graphicsSize').value,
        ram:this.userform.get('graphicsMemory').value
      }
      gpus.push(gpu);

      
      //Second Graphics Card
      let gpubrand:String ='';
      let gpumodel:String ='';
      let gpusize:String ='';
      let gpumemory:String ='';
      let gpu2:GraphicsCard;


      if(this.userform.get('graphics').value === 'Dual graphics card'){
         
        if(posted.graphicsBrand1 == undefined||null){
          errorList.push('2nd Graphics Brand not set');
        }else{gpubrand = posted.graphicsBrand1}
        
        if(posted.graphicsModel1 == undefined||null){
          errorList.push('2nd Graphics Model not set');
        }else{gpumodel = posted.graphicsModel1}

        if(posted.graphicsSize1 == undefined||null){
          errorList.push('2nd Graphics Size not set');
        }else{gpusize = posted.graphicsSize1}

        if(posted.graphicsMemory1 == undefined||null){
          errorList.push('2nd Graphics Memory not set');
        }else{gpumemory = posted.graphicsMemory1}

        gpu2 ={
        brand:gpubrand,
        model:gpumodel,
        size:gpusize,
        ram:gpumemory
        }
       
        gpus.push(gpu2);

      }
     
      //Create Hard Drive
      let hardDrives:HardDrive[] = [];
       let hardDrive:HardDrive ={
        brand:this.userform.get('hdBrand').value,  
        hdtype:this.userform.get('hdType').value,
        size:this.userform.get('hdSize').value
       }
       hardDrives.push(hardDrive);

      
       //Create Hard Drive 2
       let harddrivebrand1:String ='';
       let harddrivetype1:String ='';
       let harddrivesize1:String ='';
       let hardDrive1:HardDrive;

      

       if(posted.hdNo === '2'){
        if(posted.hdBrand1 == undefined||null){
          errorList.push('Hard Drive 2 Brand not set');
        }else{harddrivebrand1 = posted.hdBrand1}
        
        if(posted.hdType1 == undefined||null){
          errorList.push('Hard Drive 2 Type not set');
        }else{harddrivetype1 = posted.hdType1}

        if(posted.hdSize1 == undefined||null){
          errorList.push('Hard Drive 2 Size not set');
        }else{harddrivesize1 = posted.hdSize1}
       
        hardDrive1={
          brand:harddrivebrand1,  
          hdtype:harddrivetype1,
          size:harddrivesize1
         }

         hardDrives.push(hardDrive1);

       }

        //Create Hard Drive 3
        let harddrivebrand2:String ='';
        let harddrivetype2:String ='';
        let harddrivesize2:String ='';
        let hardDrive2:HardDrive;
 
        if(posted.hdNo === '3'){
          if(posted.hdBrand2 == undefined||null){
            errorList.push('Hard Drive 3 Brand not set');
          }else{harddrivebrand2 = posted.hdBrand2}
          
          if(posted.hdType2 == undefined||null){
            errorList.push('Hard Drive 3 Type not set');
          }else{harddrivetype2 = posted.hdType2}
  
          if(posted.hdSize2 == undefined||null){
            errorList.push('Hard Drive 3 Size not set');
          }else{harddrivesize2 = posted.hdSize2}

         hardDrive2={
          brand:harddrivebrand2,  
          hdtype:harddrivetype2,
          size:harddrivesize2
         }

         hardDrives.push(hardDrive2);
        }
       

        
        //Create Hard Drive 4
        let harddrivebrand3:String ='';
        let harddrivetype3:String ='';
        let harddrivesize3:String ='';
        let hardDrive3:HardDrive;
 
        if(posted.hdNo === '4'){
          if(posted.hdBrand3 == undefined||null){
            errorList.push('Hard Drive 4 Brand not set');
          }else{harddrivebrand3 = posted.hdBrand3}
          
          if(posted.hdType3 == undefined||null){
            errorList.push('Hard Drive 4 Type not set');
          }else{harddrivetype3 = posted.hdType3}
  
          if(posted.hdSize3 == undefined||null){
            errorList.push('Hard Drive 4 Size not set');
          }else{harddrivesize3 = posted.hdSize3}

         hardDrive3={
          brand:harddrivebrand3,  
          hdtype:harddrivetype3,
          size:harddrivesize3
         }

         hardDrives.push(hardDrive3);
        }

        //Create Ram
        let ram:Ram = {
          brand:this.userform.get('ramBrand').value,
          ramType:this.userform.get('ramType').value,
          ramFor:null,
          size:this.userform.get('ramSize').value
        }

        //Create Battery

        let battery:Battery ={
          cell:this.userform.get('cells').value,
          power:this.userform.get('power').value,
          model:null,
          duration:this.userform.get('duration').value
        }


        //Create Description if auto
        let describe:String ='';
        if(this.autoDes){}
        else{
          if(posted.description == undefined||null){
            errorList.push('Description is Empty . Please fill description or switch on AUTO DESCRIPTION');
          }
          else{
          describe = posted.description;
        }
        }
        
        //Create For Search
        let search:String =''+this.userform.get('brand').value+' '+this.userform.get('condition').value+' '+this.userform.get('model').value
        +' '+this.userform.get('screenSize').value+' '+this.userform.get('screenDisplay').value+' '+this.userform.get('processorCore').value
        +' '+this.userform.get('processorModel').value+' '+this.userform.get('processorGen').value+' '+this.userform.get('processorBrand').value+' '+this.userform.get('processorSpeed').value+'GHZ'
        +' '+this.userform.get('graphics').value+' '+this.userform.get('graphicsBrand').value+' '+this.userform.get('graphicsModel').value
        +' '+this.userform.get('graphicsMemory').value+((this.userform.get('graphics').value ==='Dual graphics card')?(' '+posted.graphicsBrand1
        +' '+posted.graphicsModel1+' '+posted.graphicsSize1+' '+posted.graphicsMemory1):' ')
        +this.userform.get('hdBrand').value+' '+this.userform.get('hdType').value+' '+this.userform.get('hdSize').value+' '+this.userform.get('ramBrand').value
        +' '+this.userform.get('ramType').value+' '+this.userform.get('ramSize').value+' '+this.userform.get('cells').value+' '+this.userform.get('power').value
        +' '+this.userform.get('duration').value+((this.userform.get('hdNo').value ==='2')?(' '+posted.hdBrand1
        +' '+posted.hdType1+' '+posted.hdSize1):' ')+((this.userform.get('hdNo').value ==='3')?(' '+posted.hdBrand2
        +' '+posted.hdType2+' '+posted.hdSize2):' ')+((this.userform.get('hdNo').value ==='4')?(' '+posted.hdBrand3
        +' '+posted.hdType3+' '+posted.hdSize3):' ') ;

       //calculate new price if discount
       let newprice:number =0;
       if(this.userform.get('discount').value>0 && this.userform.get('discount').value < 100 ){
        let discount:number = this.userform.get('discount').value;
        let price:number = this.userform.get('price').value;
        newprice = (price) - (price*(discount/100));
        
       } 
       
       //Arrange Pictures
       let pictures:String[] = [];
       if(!(this.pix ==='../../assets/images/icons/image.png')){pictures.push(this.pix);}
       if(!(this.pix1 ==='../../assets/images/icons/image.png')){pictures.push(this.pix1);}
       if(!(this.pix2 ==='../../assets/images/icons/image.png')){pictures.push(this.pix2);}
       if(!(this.pix3 ==='../../assets/images/icons/image.png')){pictures.push(this.pix3);}

       //Extra
       let extra:String[] =[];
       
       //Check for errors
       if(errorList.length == 0){

       let laptop:Laptop ={
        brand:this.userform.get('brand').value,    
        model:this.userform.get('model').value,    
        processor: processor,
        screen:screen,
        graphicsCard:gpus,
        hardDrive:hardDrives,
        ram:ram,
        battery:battery,
        extra:extra
       }


       //Title
       let title:String =(this.userform.get('brand').value==='For Part'?(this.userform.get('brand').value+' '+this.userform.get('model').value+' '+this.userform.get('condition').value)
       :(this.userform.get('condition').value+' '+this.userform.get('brand').value+' '+this.userform.get('model').value));

       let item:Item ={
        id:this.getId(this.userform.get('brand').value,this.userform.get('model').value),
        brand:this.userform.get('brand').value,
        picture:pictures,
        condition:this.userform.get('condition').value,
        title:title,
        description:this.autoDes?null:posted.description,
        search:search.toLowerCase(),
        laptop:laptop,
        peripheral:null,
        accessary:null,
        software:null,
        itemlocation:this.userform.get('location').value,
        quantity:this.userform.get('quantity').value,
        price:this.userform.get('price').value,
        newprice:newprice,
        discount:this.userform.get('discount').value,
        online:true
       }

       this.aws.uploadItem(item,'FocusMall');

       }
       else{
         for(let i=0;i<errorList.length;i++){
          this.messageService.add({severity:'error', summary:'Upload Failed', detail:''+errorList[i], sticky: true});
         }
       }
        

    }
 
   }

   getId(brand:String,model:String):String{
    let date:Date = new Date();  
  return brand+'-'+date.getTime().toString()+'-'+ model;
  }

}
