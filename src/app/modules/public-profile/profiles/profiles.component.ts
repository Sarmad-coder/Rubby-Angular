import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit{
  slug:any
  profile:any
  pageSkin:String=""
constructor(
  private route: ActivatedRoute,
  private profileService: ProfileService,
){}
async  ngOnInit(){
  localStorage.removeItem("profileSlug")
    this.slug = this.route.snapshot.params['slug'];
    this.profile = await this.profileService.GetProfileBySlug(this.slug)
    if (!this.profile) return
    if (!this.profile.pageSkin) {
      this.profile.pageSkin="business"
    }
    this.pageSkin=this.profile.pageSkin
  }
}
