import { Component, OnInit, inject } from '@angular/core';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

interface Data {
  title: string
  slug:string
}

@Component({
  selector: 'app-try',
  templateUrl: './qrCode.component.html',
  styleUrls: ['./qrCode.component.css']
})
export class QrCodeComponent implements OnInit{
  ref: DialogRef<Data> = inject(DialogRef);

  get slug() {
    if (!this.ref.data.slug) return 'Hello world';
    return this.ref.data.slug;
  }
  url:any
  slugMain:any
  profile:any
  constructor(
    private profileService:ProfileService,
    private route: ActivatedRoute,
  ){}
 async ngOnInit(){
  this.slugMain = this.slug
   this.profile=await this.profileService.GetProfileBySlug(this.slug)
   if (this.profile.pageSkin) {
    
     this.url='http://ruuby.co/p/'+this.slug
   }
  }
}
