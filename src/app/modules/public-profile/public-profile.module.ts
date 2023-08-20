import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBusinessComponent } from './profile-business/profile-business.component';
import { ProfileMinimalComponent } from './profile-minimal/profile-minimal.component';
import { ProfileLightComponent } from './profile-light/profile-light.component';
import { ProfileSocialComponent } from './profile-social/profile-social.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './qrCode/qrCode.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfilesComponent } from './profiles/profiles.component';
import { NgxVcardModule } from "ngx-vcard";
const routes: Routes = [
  { path: "p/:slug", component: ProfilesComponent },
  { path: "u/:slug", component: ProfileSelectorComponent },
  // { path: "business/:slug", component: ProfileBusinessComponent },
  // { path: "minimal/:slug", component: ProfileMinimalComponent },
  // { path: "light/:slug", component: ProfileLightComponent },
  // { path: "social/:slug", component: ProfileSocialComponent },
  // { path: "post/:slug", component: ProfilePostComponent },
  // { path: "card/:slug", component:ProfileCardComponent },
  // { path: "try", component: QrCodeComponent },
  { path:"setting", canActivate:[AuthGuard],component:SettingsComponent },
  { path:"change-password", canActivate:[AuthGuard],component:ChangePasswordComponent },
  { path: "analytics/:slug", component:AnalyticsComponent },
]


@NgModule({
  declarations: [
    ProfileBusinessComponent,
    ProfileMinimalComponent,
    ProfileLightComponent,
    ProfileSocialComponent,
    ProfilePostComponent,
    ProfileCardComponent,
    ProfileSelectorComponent,
    SettingsComponent,
    ChangePasswordComponent,
    QrCodeComponent,
    AnalyticsComponent,
    ProfilesComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgChartsModule,
    NgxVcardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    QRCodeModule
  ],
})
export class PublicProfileModule { }
