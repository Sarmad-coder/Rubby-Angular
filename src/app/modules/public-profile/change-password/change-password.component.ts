import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BaseSaveComponent } from 'src/app/shared/BaseSaveComponent';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseSaveComponent implements OnInit{
  slug: any;
  cPassword:String="password";
  nPassword:String="password"
  password:String="password"
  constructor(
    private userService: UserService,
    private router: Router,
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) {
    super();
  }
  ngOnInit() {
    // this.slug = this.route.snapshot.params['slug'];
  }
  loading = false;
  form: FormGroup<any> = new FormGroup({
    currentPassword: new FormControl("", [Validators.required], [this.passwordNotMatch()]),
    password: new FormControl("", { validators: [Validators.required, Validators.minLength(6)] }),
    ConfirmnewPassword: new FormControl("", [Validators.required, this.passwordMismatch()]),
  }, { updateOn: 'submit' });

  passwordMismatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmPassword = control.value;
      const password = control.parent?.get('password')?.value;

      return confirmPassword != null && password != null && confirmPassword !== password ? { mismatch: true } : null;
    };
  }
  private passwordNotMatch(): AsyncValidatorFn {
    return async ({ value }: AbstractControl): Promise<ValidationErrors | null> => {
      if (!value) return null;
      const currentPassword = value;
      const token = localStorage.getItem("token")
      const user: any = await this.userService.GetUserByToken(token)
      const password = user.password

      return currentPassword != null && password != null && currentPassword !== password ? { notmatch: true } : null;
    };
  }
  async submitForm(): Promise<void> {
    if (!(await this.isValid())) return;

    delete this.form.value.currentPassword
    delete this.form.value.ConfirmnewPassword
    this.form.value.token=localStorage.getItem("token")

const resp=await this.userService.ChangePassword(this.form.value)
if (resp) {
  // const profile: any = await this.profileService.GetProfileBySlug(this.slug)
  this.router.navigate(["/setting"])
}
 }
  async goBack() {
    const slug = localStorage.getItem("profileSlug")
    const profile: any = await this.profileService.GetProfileBySlug(slug)
    this.router.navigate(["/setting"])
  }

}
