import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseSaveComponent } from 'src/app/shared/BaseSaveComponent';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-onboarding1.1',
  templateUrl: './onboarding1.1.component.html',
  styleUrls: ['./onboarding1.1.component.css']
})
export class Onboarding11Component extends BaseSaveComponent implements OnInit {

  loading = false;
  form: FormGroup<any> = new FormGroup({
   
    slug: new FormControl("", [Validators.required, Validators.pattern(/^\S*$/)], [this.isSlugDoublicate()]),
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    bio: new FormControl("", [Validators.required]),
    removePageFromDiscovery: new FormControl(false),
  }, { updateOn: 'submit' });

  user: any
  profile: any
  formData = new FormData()
  imgUrl: any;
  imgName: any
  imgUrl2: any;
  imgName2: any
  imgChecker:any
  imgError:Boolean=false
  apiUrl:String=environment.apiUrl
  logo:String=""
  edit:any
  editFromProfile:string="";
  saveExsit:boolean=false;
 errorAlert:boolean=false
  

  constructor(private userService: UserService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
    private orderService:OrderService
  ) {
    super();
  }

  async ngOnInit() {
    this.edit=localStorage.getItem("profileSlug")
    this.editFromProfile=localStorage.getItem("editFromProfile")||""
    if (this.edit) {
      
      this.form.get("slug")?.disable()
    }
    const token = localStorage.getItem("token")
    this.user = await this.userService.GetUserByToken(token)

    const order:any=await this.orderService.GetOrder(this.user.email)
    if (!order) {
      this.router.navigate([environment.madosaUrl])
    }
    this.logo=order.logo
    console.log(this.user)
    const slug = localStorage.getItem("profileSlug")
    if (slug) {
      this.profile = await this.profileService.GetProfileBySlug(slug)
      if (this.profile) {
        this.imgName = this.profile?.thumbnail
        this.imgName2=this.profile.coverPhoto
       this.imgChecker=this.imgName
        this.form.patchValue(this.profile)
      } else {
        localStorage.removeItem("profileSlug")
      }


    }
  }

  onImgSelect(e: any) {
    // console.log(e.target.files[0])
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
    
    this.formData.append("thumbnail", e.target.files[0])
    this.imgChecker=e.target.files[0]
  }
  onCoverPhoto(e: any) {
    // console.log(e.target.files[0])
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imgUrl2 = e.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
    
    this.formData.append("coverPhoto", e.target.files[0])
  }

  async submitForm(): Promise<void> {
    if (!(await this.isValid())) {
      this.errorAlert=true
      return;
    }
    if (!this.imgChecker) {
      this.imgError=true;
      return
    }
    this.errorAlert=false
    this.loading=true
    this.imgError=false;
    this.formData.append("userID", this.user._id)
    this.formData.append("slug", this.form.value.slug)
    this.formData.append("name", this.form.value.name)
    this.formData.append("email", this.form.value.email)
    this.formData.append("bio", this.form.value.bio)
    this.formData.append("removePageFromDiscovery", this.form.value.removePageFromDiscovery)
    console.log(this.formData)
    this.formData.append("_id", this.profile._id) 
    if (this.profile) {
      this.form.value._id = this.profile._id
      await this.profileService.UpdateProfile(this.formData)
      localStorage.setItem("profileSlug", this.profile.slug)
    } else {
      let resp: any = await this.profileService.CreateProfile(this.formData)
      localStorage.setItem("profileSlug", resp.slug)
    }
    if (this.saveExsit) {
      localStorage.removeItem("profileSlug")
    localStorage.removeItem("editFromProfile")
    this.router.navigate(["/p/"+this.edit])
    }else{
      
      this.router.navigate(["/onboarding/onboarding-1.2"])
    }
    this.loading=false
  }

  private isSlugDoublicate(): AsyncValidatorFn {

    return async ({ value }: AbstractControl): Promise<ValidationErrors | null> => {
      if (!value) return null;

      // const token=localStorage.getItem("token")
      const resp: any = await this.profileService.GetProfileBySlug(value)
      if (!resp) {
        return null
      } else if(!this.profile){
        return { registered: true }
      }
      if (resp._id == this.profile._id) {
        return null
      } else {
        return { registered: true }
      }


    };
  }


}