import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseSaveComponent } from 'src/app/shared/BaseSaveComponent';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent extends BaseSaveComponent implements OnInit {
  loading = false;
  form: FormGroup<any> = new FormGroup({
    companyName: new FormControl(""),
    jobTitle: new FormControl(""),
    location: new FormControl(""),
    taxOffice: new FormControl(""),
    taxId: new FormControl(""),
    iban: new FormControl(""),


  }, { updateOn: 'submit' });


  profile: any
  edit: any
  errorAlert: boolean = false
  editFromProfile: string = "";
  saveExsit:boolean=false;
  constructor(private userService: UserService,
    private profileService: ProfileService,
    private router: Router
  ) {
    super();

  }

  async ngOnInit() {
    this.edit = localStorage.getItem("profileSlug")
    this.editFromProfile = localStorage.getItem("editFromProfile") || ""
    const slug = localStorage.getItem("profileSlug")
    if (slug) {
      this.profile = await this.profileService.GetProfileBySlug(slug)
      this.form.patchValue(this.profile)
    }
  }
  async submitForm(): Promise<void> {
    if (!(await this.isValid())) {
      this.errorAlert = true
      return;
    }
    this.errorAlert = false
    this.loading = true
    this.form.value._id = this.profile._id
    console.log(this.form.value)

    let resp = await this.profileService.UpdateProfile(this.form.value)
    console.log(resp)
    this.loading = false
    if (this.saveExsit) {
      localStorage.removeItem("profileSlug")
    localStorage.removeItem("editFromProfile")
    this.router.navigate(["/p/"+this.edit])
    }else{
      
      this.router.navigate(["/onboarding/education"])
    }
   
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
      upArrow.style.display = "block"
      inputBox.style.display = "block"
    } else {
      downArrow.style.display = "block"
      upArrow.style.display = "none"
      inputBox.style.display = "none"
    }
  }
}
