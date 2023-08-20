import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BaseSaveComponent } from 'src/app/shared/BaseSaveComponent';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent extends BaseSaveComponent {
  loading = false;

  form: FormGroup<any> = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [this.isEmailRegistered()] }),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMismatch()]),
    },
    { updateOn: 'submit' }
  );

  password: String = 'password';
  cPassword: String = 'password';
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private orderService: OrderService) {
    super();
  }

  async submitForm(): Promise<void> {
    if (!(await this.isValid())) return;
    this.loading=true
    delete this.form.value.confirmPassword;

    const resp: any = await this.userService.CreateUser(this.form.value);

    localStorage.setItem('token', resp.token);
    const order: any = await this.orderService.GetOrder(resp.user.email);
    if (!order) {
      window.location.href = environment.madosaUrl;
    } else {
      this.router.navigate(['/onboarding']);
    }
    this.loading=false
  }

  passwordMismatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmPassword = control.value;
      const password = control.parent?.get('password')?.value;

      return confirmPassword != null && password != null && confirmPassword !== password ? { mismatch: true } : null;
    };
  }

  private isEmailRegistered(): AsyncValidatorFn {
    return async ({ value }: AbstractControl): Promise<ValidationErrors | null> => {
      if (!value) return null;

      const resp = await this.userService.GetUserByEmail(value);

      return resp ? { registered: true } /* invalid */ : null; /* valid */
    };
  }

  //   requiredError:string="";

  // signup(){
  //   this.requiredError=""
  //   if (this.user.controls.username.errors) {
  //     this.requiredError="username"
  //   }else if (this.user.controls.name.errors) {
  //     this.requiredError="name"
  //   }else if (this.user.controls.email.errors) {
  //     this.requiredError="email"
  //   }else if (this.user.controls.password.errors) {
  //     this.requiredError="password"
  //   }else if (this.user.controls.confirmPassword.errors) {
  //     this.requiredError="confirmPassword"
  //   }else{
  //     console.log(this.user.value)
  //   }
  //   console.log(this.requiredError)
  // }
}
