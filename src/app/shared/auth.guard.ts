import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private orderService: OrderService,private router:Router) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      var resp:any = await this.userService.GetUserByToken(localStorage.getItem("token"))
      console.log({resp});
      if (resp) {
        console.log(resp);
        const order:any=await this.orderService.GetOrder(resp.email)
        if (!order){
          // window.location.href=environment.madosaUrl;
          // return false;
        }
        return true
      } else {
        localStorage.removeItem("token")
        // this.router.navigate(["/activate/login-page"])
        return this.router.parseUrl("/login")
      }
    } else {
      return this.router.parseUrl("/login")
    }

  }

}
