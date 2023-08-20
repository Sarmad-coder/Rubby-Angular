import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BaseSaveComponent } from 'src/app/shared/BaseSaveComponent';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent extends BaseSaveComponent {
  loading = false;
  isUserAvailableError = true;

  form: FormGroup<any> = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
    },
    { updateOn: 'submit' }
  );

  password: String = 'password';

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private profileService: ProfileService,
    private orderService: OrderService
  ) {
    super();
  }

  async submitForm(): Promise<void> {
    this.loading = true;
    if (!(await this.isValid())) return;
    
    if (!(await this.isUserAvailable())){
      this.loading = false;
      return;
    }
    
    
    
    console.log(this.loading);
    const resp: any = await this.userService.GetUser(this.form.value);

    if (resp) {
      localStorage.setItem('token', resp.token);

      const order: any = await this.orderService.GetOrder(resp.user.email);
      if (!order) {
        window.location.href = environment.madosaUrl;
      } else {
        if (resp.user.profiles.length == 1) {
          const profile: any = await this.profileService.GetProfileByID(resp.user.profiles[0]);
          if (profile.pageSkin) {

            this.router.navigate(["/setting"])
          }else{
            this.router.navigate(["/onboarding"])
          }

        }else if (resp.user.profiles.length>1) {
          this.router.navigate(["/setting"])
        }else{

          this.router.navigate(["/onboarding"])
        }
      }
    }
    // this.loading=false
  }

  async isUserAvailable() {
    const resp: any = await this.userService.GetUser(this.form.value);
    this.isUserAvailableError = resp ? true : false;

    return this.isUserAvailableError;
  }
  createAccount(){
    window.location.href = environment.madosaUrl;
  }

}
