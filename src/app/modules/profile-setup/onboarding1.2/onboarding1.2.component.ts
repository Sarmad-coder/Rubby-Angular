import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-onboarding1.2',
  templateUrl: './onboarding1.2.component.html',
  styleUrls: ['./onboarding1.2.component.css']
})
export class Onboarding12Component implements OnInit {

  selectedDiv: String = "";
 
  profile: any
  user:any;
  loading:boolean=false
edit:any
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private toastr:ToastrService
  ) { }
  async ngOnInit() {
    this.edit=localStorage.getItem("edit")
    const slug = localStorage.getItem("profileSlug")
    const token=localStorage.getItem("token")
    this.user=await this.userService.GetUserByToken(token)
    if (slug) {
      this.profile = await this.profileService.GetProfileBySlug(slug)
      this.selectedDiv = this.profile.pageSkin
    }
  }
  selectSkin(id: string) {
    this.selectedDiv = id
  }

  async submit() {
    if (this.selectedDiv) {
      this.loading=true
     const pageSkin: Object = {
        pageSkin: this.selectedDiv,
        _id: this.profile._id
      }
      await this.profileService.UpdateProfile(pageSkin)
      console.log(this.user.profiles)
      let index=this.user.profiles.length
      const slug=localStorage.getItem("profileSlug")
      localStorage.removeItem("profileSlug")
      localStorage.removeItem("edit")
      localStorage.removeItem("editFromProfile")
      this.loading=false
      this.router.navigate(["/p/"+slug])
      // if (index==1) {
      //   this.router.navigate(["/public/"+this.selectedDiv+"/"+slug])
      // }else{
      //   this.router.navigate(["/p/profileSelector"])
      // }
       
    } else {
      this.toastr.error("Please select a page skin for your profile")
      return
    }
  }
}
