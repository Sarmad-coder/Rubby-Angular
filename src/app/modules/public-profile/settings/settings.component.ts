import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { uniq, uniqBy } from 'lodash';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  profiles: any
  profile: any
  slug: any
  apiUrl: String = environment.apiUrl
  totalViews: number = 0
  order:any
  constructor(
    private setting: SettingService,
    private profileService: ProfileService,
    private userService: UserService,
    private orderService:OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    localStorage.removeItem("edit")
    localStorage.removeItem("profileSlug")
    if (localStorage.getItem("profileSlug")) {
      this.slug=localStorage.getItem("profileSlug")
    }

    const token = localStorage.getItem("token")
    const user: any = await this.userService.GetUserByToken(token)
    if (!user) return
    this.profiles = await this.profileService.GetAllProfiles(user._id)
    let i=0;
    this.profiles.forEach((profile:any) => {
     let totalViews:number=0


      let date1 = uniqBy(profile.views, (x: any) => x.date)
      const data: number[] = [];
      const labels: string[] = [];
      let views = 0;
      let date: any = []
      let dateTesting = getlast7Days()
      for (const item of date1) {
        if (dateTesting.start_date.getTime() <= new Date(item.date).getTime() && new Date(item.date).getTime() <= dateTesting.end_date.getTime()) {

          date.push(item)
        }
      }

      for (let index = 0; index < date.length; index++) {
        views = 0;

        profile.views.forEach((item: any) => {
          if (item.date == date[index].date) {
            views += 1
          }
        })

        data.push(views)
        labels.push(date[index].date)


      }
      data.forEach((item) => {
        totalViews += item
      })
      this.profiles[i].totalViews=totalViews
      i++
    })

    function getlast7Days() {
      const end_date = new Date();
      const start_date = new Date();
      start_date.setDate(start_date.getDate() - 9);

      return { start_date, end_date };
    }
    this.orderService.GetOrder(user.email).then((resp)=>{
      this.order=resp
    })
  }

  showProfile() {
    this.router.navigate(["/p/"+ this.slug])
  }
  edit(profileID: any) {
    const profile = this.profiles.find((item: { _id: any; }) => item._id == profileID)
    localStorage.setItem("profileSlug", profile.slug)
    this.router.navigate(["/onboarding"])
  }

  displayFunction(boxName: any) {
    let downArrow = document.getElementById(boxName + "DownArrow")
    let upArrow = document.getElementById(boxName + "UpArrow")
    let inputBox = document.getElementById(boxName + "Input")
    if (!upArrow || !downArrow || !inputBox) {
      return
    }
    if (upArrow.style.display == "none") {
      downArrow.style.display = "none"
      upArrow.style.display = "flex"
      inputBox.style.display = "block"
    } else {
      downArrow.style.display = "flex"
      upArrow.style.display = "none"
      inputBox.style.display = "none"
    }
  }
  newProfile() {
    localStorage.removeItem("profileSlug")
    localStorage.removeItem("edit")
    this.router.navigate(["/onboarding"])
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["login"])
  }
  viewProfile(slug:any){
    // this.router.navigate(["/p/"+slug])
    const newWindow = window.open("/p/"+slug, '_blank');
    newWindow?.focus();
  }
  completeOrder(){
    window.location.href = environment.madosaUrl+"/upload-artwork";
  }
}
