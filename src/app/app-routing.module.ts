import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { SplashScreenComponent } from './Component/splash-screen/splash-screen.component';

const routes: Routes = [
  {path:"",component:SplashScreenComponent},
  {
    path: "",
    
    loadChildren: () => import("./modules/public-profile/public-profile.module").then(mod => mod.PublicProfileModule)
  },
  {
    path: "",
    // canActivate:[AuthGuard],
    loadChildren: () => import("./modules/activation/activation.module").then(mod => mod.ActivationModule)
  },
  {
    path:"onboarding",
    canActivate:[AuthGuard],
    loadChildren:()=>import("./modules/profile-setup/profile-setup.module").then(mod=>mod.ProfileSetupModule)
  }
];

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
