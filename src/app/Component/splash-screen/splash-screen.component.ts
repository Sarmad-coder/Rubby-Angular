import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit{
  loading:boolean=true
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private orderService:OrderService
  ){}
 async ngOnInit() {
    localStorage.removeItem("profileSlug")
    if (localStorage.getItem("token")) {
       await this.userService.GetUserByToken(localStorage.getItem("token")).then(async (resp:any)=>{
      
        let orderResp=await this.orderService.GetOrderByEmail(resp.email)
        if (orderResp) {
          this.router.navigate(["/setting"])
        }else{
          // this.router.navigate(["/order"])
          window.location.href = environment.madosaUrl;
        }
      }).catch(()=>{
        localStorage.removeItem("token")
        this.router.navigate(["/login"])
      })

    
    } else {
      // this.router.navigate(["/order"])
      // window.location.href = environment.madosaUrl;
      this.router.navigate(["/login"])
    }
  }

}
