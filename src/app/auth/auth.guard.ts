import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {
      let url :string = state.url;
      console.log('Can activate Child Called');
      return this.checkLogin(url);
  }
  constructor(private userService:UserService,private router:Router){ }

  checkLogin(url: string): boolean {
    console.log('canactivate child'+" "+this.userService.getUserCredentials());
    if(this.userService.getUserCredentials() !=null){return true}

    //Store attempted URL for redirecting
   this.userService.setUrl(url);

   //Navigate to login page
   this.router.navigate(['home/login']);
  return false;
  }
  
}
