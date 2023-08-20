import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private orderService: OrderService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (localStorage.getItem("token")) {
      let resp: any = await this.userService.GetUserByToken(localStorage.getItem("token"))
      if (resp) {

        // if (resp?.profiles?.length == 1) {
        //   const profile: any = await this.profileService.GetProfileByID(resp.profiles[0])
        //   if (profile.pageSkin) {

        //     return this.router.navigate(["/p/"+ profile.slug])
        //   }else{
        //     return this.router.navigate(["/onboarding"])
        //   }
        // } else if (resp.profiles.length > 1) {
        //   return this.router.navigate(["/p/profileSelector"])
        // } else {

        //   return this.router.navigate(["/onboarding"])
        // }
        const order: any = await this.orderService.GetOrder(resp.email);
        if (!order) {
          window.location.href = environment.madosaUrl;
          return false
        } else {
          this.router.navigate(["/setting"])
          return false
        }

      } else {
        localStorage.removeItem("token")
        // this.router.navigate(["/activate/login-page"])
        return true
      }
    } else {
      return true
    }

  }

}
