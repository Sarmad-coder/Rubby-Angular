import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.css']
})
export class ProfileSelectorComponent implements OnInit{
  profiles:any
isAnimated: Boolean=false;
apiUrl:String=environment.apiUrl
constructor(
  private profileService:ProfileService,
  private userService:UserService,
  private router:Router
  ){}
 async ngOnInit(){
    const token=localStorage.getItem("token")
    const user:any=await this.userService.GetUserByToken(token)
    this.profiles=await this.profileService.GetAllProfiles(user._id)
    if (this.profiles.length==1) {
      this.router.navigate(["/p/"+this.profiles[0].slug])
    }else if (!this.profiles) {
      this.router.navigate(["/activation"])
    }
  }
  selectProfile(profileID:any){
    const profile=this.profiles.find((item: { _id: any; })=>item._id==profileID)
   
    this.router.navigate(["/p/"+profile.slug])
  }
 

}
