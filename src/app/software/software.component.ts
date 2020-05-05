import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { MessageService } from 'primeng/api';
import { AwsService } from '../service/aws.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  userform: FormGroup;
  //category
  category: SelectItem[];

  //subcategory
  subcategory: SelectItem[];

    //List of Pictures
    video:String ='https://www.youtube.com/embed/zpOULjyy-n8?rel=0';
  constructor(private fb: FormBuilder,private messageService:MessageService,private aws:AwsService) { }

  ngOnInit(): void {

    this.aws._upload$
    .subscribe((video)=>{
      if(video.length > 0){
        this.video = video[1];
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
      'category': new FormControl('', Validators.required),
      'subcategory': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'discount': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
  });

  this.category = [];
  this.category.push({label:'Select Category', value:''});
  this.category.push({label:'Productivity', value:'Productivity'});

  this.subcategory = [];
  this.subcategory.push({label:'Select Sub-Category', value:''});
  }

  onUpload(event){
    let selecetdFile:File = event.target.files[0];
    this.aws.uploadPicture(selecetdFile,selecetdFile.name,0);
  }

  onSubmit(value: string) {

  }

}
