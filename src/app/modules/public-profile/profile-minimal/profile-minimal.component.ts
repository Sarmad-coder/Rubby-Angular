import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';
import { SettingsComponent } from '../settings/settings.component';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { DialogService } from '@ngneat/dialog';
import { QrCodeComponent } from '../qrCode/qrCode.component';
import { VCard } from "ngx-vcard";
@Component({
  selector: 'app-profile-minimal',
  templateUrl: './profile-minimal.component.html',
  styleUrls: ['./profile-minimal.component.css']
})
export class ProfileMinimalComponent implements OnInit{

  @ViewChild(SettingsComponent) settingsComponent!: SettingsComponent;

  profilePage: Boolean = true
  profile: any
  video: any = ""
  showSettingBtn:Boolean=false
  slug:any
  apiUrl:String=environment.apiUrl
  contactInfo:boolean=false
  socialMediaLinks=false
  constructor(
    private profileService: ProfileService,
    private setting: SettingService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private userService:UserService,
    private dialog: DialogService
  ) {}

  async ngOnInit() {
   this.slug = this.route.snapshot.params['slug'];
    if (this.slug) {
      this.profile = await this.profileService.GetProfileBySlug(this.slug)
      this.video = this.profile.video.split("be/")
      this.video = "https://www.youtube.com/embed/" + this.video[1]
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
      console.log(this.video)
      
      const token = localStorage.getItem("token")
      if (token) {
        const user: any = await this.userService.GetUserByToken(token)
        for(let item of user.profiles){
          if (item == this.profile._id) {
            this.showSettingBtn = true
            break
          } else {
            this.showSettingBtn = false
          }
        };
      } else {
        this.showSettingBtn = false
      }
    }
    if (this.profile.phoneNo || this.profile.email || this.profile.website) {
      this.contactInfo=true
    }
    if (this.profile.socialYoutube||this.profile.socialTwitter||this.profile.socialInstagram||this.profile.socialFacebook||this.profile.socialWhatsapp) {
      this.socialMediaLinks=true
    }
  }

  seeMore() {
    var moreText = document.getElementById("seeMore");
    var btnText = document.getElementById("seeBtn");
    if (!moreText || !btnText) return;
    if (moreText.style.display == "none") {
      moreText.style.display = "inline";
      btnText.innerHTML = "See Less";
    } else {
      moreText.style.display = "none";
      btnText.innerHTML = "See More";
    }
  }
  showQR(){
    const dialogRef = this.dialog.open(QrCodeComponent, {
      // data is typed based on the passed generic
      width: '320px',
      height:'320px',
      data: {
        title: '',
        slug: this.slug
      },
    });
  }
  showSetting(){
    localStorage.setItem("profileSlug",this.slug)
    this.router.navigate(["/setting"])
  }
  edit(route:string){
    localStorage.setItem("profileSlug", this.slug)
    localStorage.setItem("editFromProfile", "true")
    this.router.navigate([route])
  }
  public generateVCardOnTheFly = (): VCard => {
    // TODO: Generate the VCard before Download
    return {
      name: { firstNames: this.profile.name,lastNames:"" },
      email:[this.profile.email],
      telephone: [

        {
          value: this.profile.phoneNo,
          param: {
            type: 'work' // This could also be 'home', 'text', 'voice', 'fax', 'cell', 'video', 'pager', or 'textphone'
          }
        }
        
      ],
    };
  };


  share() {
    if (navigator.share) {
      navigator.share({
        title: 'Check this out!',
        text: 'Hello, check out this link!',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web share not supported on this browser');
    }
  }
}
