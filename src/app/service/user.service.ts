import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { CookieService } from 'ngx-cookie-service';
import { Message } from '../classes/message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //redirect url
  url:String = null;

  private _usr = new Subject<User>();
  _usr$ = this._usr.asObservable();

  constructor(private http:HttpClient,private cookies:CookieService) { }


  getUsers(){
    return this.http.get<any>('/assets/data/users.json')
    .toPromise()
    .then(res => <User[]>res.data)
    .then(data => { return data; });
  }

  getUserMessage(){
    return this.http.get<any>('/assets/data/messages.json')
    .toPromise()
    .then(res => <Message[]>res.data)
    .then(data => { return data; });
  }

  setUrl(url:String){
    this.url = url;
  }

  getUrl(){
    return this.url;
  }

  setUserCredentials(us:User){
    let user:User = us;
    user.password = null;
    this.cookies.set('onome-user-credentials',JSON.stringify(user),1,'/');
    this._usr.next(user);
  }

  getUserCredentials(){
    if(this.cookies.get('onome-user-credentials').length > 5){
      return JSON.parse(this.cookies.get('onome-user-credentials'));
    }
    return null;
  }

  logout(){
    this.cookies.delete('onome-user-credentials','/');
    this._usr.next(null);
  }

}
