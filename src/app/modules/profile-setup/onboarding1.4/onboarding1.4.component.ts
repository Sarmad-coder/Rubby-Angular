import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-onboarding1.4',
  templateUrl: './onboarding1.4.component.html',
  styleUrls: ['./onboarding1.4.component.css']
})
export class Onboarding14Component implements OnInit {

  acceptButtonRadius: String = "";
  form = new FormGroup({
    // thumbnail:new FormControl("", [Validators.required]),
    acceptButtonText: new FormControl(""),
    acceptButtonIcon: new FormControl(""),
    acceptButtonColor: new FormControl("#B5B5B5"),
    acceptButtonTextColor: new FormControl("#B5B5B5"),



  }, { updateOn: 'submit' });
  profile: any;
  user: any
  logo: string = ""
  loading: boolean = false
edit:any
  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private orderService: OrderService
  ) {

  }

  async ngOnInit() {
    this.edit=localStorage.getItem("edit")
    const token = localStorage.getItem("token")
    this.user = await this.userService.GetUserByToken(token)

    const order: any = await this.orderService.GetOrder(this.user.email)
    if (!order) {
      this.router.navigate([environment.madosaUrl])
    }
    this.logo = order.logo


    const slug = localStorage.getItem("profileSlug")
    if (slug) {
      this.profile = await this.profileService.GetProfileBySlug(slug)

      this.form.patchValue({
        acceptButtonText: this.profile.acceptButtonText,
        acceptButtonIcon: this.profile.acceptButtonIcon,

      })
      this.acceptButtonRadius = this.profile.acceptButtonRadius
      let radiusBtn = document.getElementById("radiusShow")
      if (radiusBtn && this.profile.acceptButtonRadius) {
        radiusBtn.innerText = this.profile.acceptButtonRadius
      }
      let iconBox = document.getElementsByName(this.profile.acceptButtonIcon) as any
      if (iconBox && this.profile.acceptButtonIcon) {
        iconBox[0].classList.add('selected')
      }
      const btnColorNum = document.getElementById("btnColorNum")
      const btnClrShow = document.getElementById("btnClrShow")
      const txtClrShow = document.getElementById("txtClrShow")
      const txtColorNum = document.getElementById("txtColorNum")

      if (btnColorNum && btnClrShow && this.profile.acceptButtonColor) {
        btnColorNum.innerText = this.profile.acceptButtonColor
        btnClrShow.style.backgroundColor = this.profile.acceptButtonColor
        this.form.patchValue({
          acceptButtonColor: this.profile.acceptButtonColor
        })
      }
      if (txtClrShow && txtColorNum && this.profile.acceptButtonTextColor) {
        txtColorNum.innerText = this.profile.acceptButtonTextColor
        txtClrShow.style.backgroundColor = this.profile.acceptButtonTextColor
        this.form.patchValue({
          acceptButtonTextColor: this.profile.acceptButtonTextColor
        })
      }
    }
  }

  async submitForm() {
    
    this.loading = true;
    (this.form.value as any).acceptButtonRadius = this.acceptButtonRadius;
    (this.form.value as any)._id = this.profile._id
    console.log(this.form.value);
    await this.profileService.UpdateProfile(this.form.value)
    this.loading=false
    this.router.navigate(["/onboarding/onboarding-1.4"])
  }
  
  changeRadius(conditionChecker: any) {
    const radiusEl = document.getElementById("radiusShow");

    if (!radiusEl?.innerText)
      return;

    radiusEl.innerText = conditionChecker == "plus"
      ? (+radiusEl.innerText + 1).toString()
      : (+radiusEl.innerText - 1).toString()
    this.acceptButtonRadius = radiusEl.innerText
  }

  changeColor(conditionChecker: any) {
    const btnColor = document.getElementById("btnColor") as HTMLInputElement;
    const txtColor = document.getElementById("txtColor") as HTMLInputElement;
    const btnColorNum = document.getElementById("btnColorNum")
    const btnClrShow = document.getElementById("btnClrShow")
    const txtClrShow = document.getElementById("txtClrShow")
    const txtColorNum = document.getElementById("txtColorNum")
    if (!btnColor || !txtColor || !btnColorNum || !btnClrShow || !txtClrShow || !txtColorNum) return;

    if (conditionChecker == "btn") {
      btnColorNum.innerText = btnColor.value
      btnClrShow.style.backgroundColor = btnColor.value
    } else {
      txtClrShow.style.backgroundColor = txtColor.value
      txtColorNum.innerText = txtColor.value
    }
  }

  myFunction() {


    // remove the selected class from all boxes
    var boxes = document.getElementsByClassName('box');
    for (var j = 0; j < boxes.length; j++) {
      boxes[j].classList.remove('selected');
    }

    // add the selected class to the current box
    var selectedBox: any = document.querySelector('input[name="box"]:checked')

    if (!selectedBox) return

    selectedBox = selectedBox?.nextElementSibling?.children[0];

    selectedBox.classList.add('selected');
    
  }
}
