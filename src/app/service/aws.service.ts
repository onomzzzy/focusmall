import { Injectable } from '@angular/core';
// import entire SDK
import * as S3 from 'aws-sdk/clients/s3';

import { User } from '../classes/user';
import { Item } from '../classes/item';
import { ItemService } from './item.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  
  //Upload Pictures
  private _upload = new Subject<any[]>();
  _upload$ = this._upload.asObservable();

  //Upload Item
  private _uploadItem = new Subject<String[]>();
  _uploadItem$ = this._uploadItem.asObservable();
  http: any;

  constructor(private item:ItemService) { }

  async uploadItem(item:Item,storename:String){
    //Check if file exist
    let items:Item[] = [];
    //Key
    const bucket = new S3(
      {
          accessKeyId: 'AKIA3UZA6DLJHL3ABW6C',
          secretAccessKey: 'A8isoIAep0K1qW+lChHwPNVeoymgq/+xygJNwknY',
          //region: 'YOUR-REGION'
      }
  );
  //Key
  
    const params = {
        Bucket: 'onome',
        Key:''+storename
    };
    try{
      const data = await bucket.getObject(params).promise();
      items = JSON.parse(data.Body.toString());
      items.push(item);
      this.storeInS3(items,storename+'');
    }catch(err){
      items.push(item);
      this.storeInS3(items,storename+'');
    }
   
  }

  storeInS3(items:Item[],storename:string){
    const contentType = 'application/json';

    //Key
    const bucket = new S3(
      {
          accessKeyId: 'AKIA3UZA6DLJHL3ABW6C',
          secretAccessKey: 'A8isoIAep0K1qW+lChHwPNVeoymgq/+xygJNwknY',
          //region: 'YOUR-REGION'
      }
  );
  //Key
    let file = JSON.stringify(items); 
    const params = {
        Bucket: 'onome',
        Key: storename,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
    };
    bucket.upload(params, function (err, data) {})
    .promise().then((data)=>{
      let msg:String[] = [];
      msg[0] = 'info';
      msg[1] = 'Success';
      msg[2] = 'Item was successfully Posted';
      this._uploadItem.next(msg);
    }).catch((error)=>{
      let msg:String[] = [];
      msg[0] = 'error';
      msg[1] = 'Failed Upload';
      msg[2] = 'An Error occur. Item was not Posted';
      this._uploadItem.next(msg);
    });
  }


  uploadPicture(picture:File,name:String,no:number){
    const contentType = picture.type;
    let nameu:string = name+'';
    let pix:string = this.getName(name)+'';
    const bucket = new S3(
        {
            accessKeyId: 'AKIA3UZA6DLJHL3ABW6C',
            secretAccessKey: 'A8isoIAep0K1qW+lChHwPNVeoymgq/+xygJNwknY',
            //region: 'YOUR-REGION'
        }
    );
    const params = {
        Bucket: 'onomepixs',
        Key: pix+'',
        Body: picture,
        ACL: 'public-read',
        ContentType: contentType
    };
    bucket.upload(params, function (err, data) {})
    .promise().then((data)=>{
      let picture:any[] = [];
      picture[0] = no
      picture[1] = 'https://onomepixs.s3.us-east-2.amazonaws.com'+'/'+pix;
      this._upload.next(picture);
    }).catch((error)=>{
      let picture:any[] = [];
      this._upload.next(picture);
    });
  }

  getName(name:String):String{
    let date:Date = new Date();  
  return date.getTime().toString()+'-'+ name.replace(" ","_");
  }



  uploadUser(){
    let user:User =  {
      "id":"samo123r45e",
      "username":"onomzzzy@gmail.com",
      "password":"onome12345",
      "firstname":"Samuel",
      "lastname":"Onome",
      "pix":"../../assets/images/users/jesse.jpg",
      "role":"USER",
      "address":"20 David Street Ojo Lagos",
      "phoneno":"09056784325",
      "whatsapp":"08067543261"
  }
    let file = JSON.stringify(user);
  
  const contentType = 'application/json';
  const bucket = new S3(
        {
            accessKeyId: 'AKIA3UZA6DLJHL3ABW6C',
            secretAccessKey: 'A8isoIAep0K1qW+lChHwPNVeoymgq/+xygJNwknY',
            //region: 'YOUR-REGION'
        }
    );
    const params = {
        Bucket: 'onome',
        Key: 'onom.json',
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
    };
    bucket.upload(params, function (err, data) {
        if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
        }
        console.log('Successfully uploaded file.', data);
        return true;
    });
//for upload progress   
/*bucket.upload(params).on('httpUploadProgress', function (evt) {
        console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
    }).send(function (err, data) {
        if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
        }
        console.log('Successfully uploaded file.', data);
        return true;
    });*/

    //get File 
    /*
     s3.getObject(params, function(err, data) {
      if (err) {
        console.error(err); // an error occurred
      } else {
        const string = new TextDecoder('utf-8').decode(data.Body);
        console.log(string);
      }
    });
    */

    /*

 ngOnInit(){
    this.fetchData();
  }

  private fetchData(){
    const promise = this.httpClient.get(this.apiUrl).toPromise();
    console.log(promise);  
    promise.then((data)=>{
      console.log("Promise resolved with: " + JSON.stringify(data));
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }
}

try {
      await bucket.headObject(params).promise()
      this.item.getStoreItems(storename)
     .subscribe((data)=>{
      items = JSON.parse(JSON.stringify(data));
      items.push(item);
      this.storeInS3(items,storename+'');
    });
  } catch (err) {
    items.push(item);
    this.storeInS3(items,storename+'');
  }
   

    */

  }
}
