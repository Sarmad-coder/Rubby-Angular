import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateComponent } from './activate/activate.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginGuard } from 'src/app/shared/login.guard';
import { environment } from 'src/environments/environment';

const routes:Routes=[
  
  {path:"activation",component:ActivateComponent},
  {path:"login",  canActivate:[LoginGuard],component:LoginPageComponent},
  // {path:"signup",canActivate:[LoginGuard],component:SignupPageComponent},
]

@NgModule({
  declarations: [
    ActivateComponent,
    LoginPageComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // BrowserAnimationsModule,
    // ToastrModule
  ]
})
export class ActivationModule { }
