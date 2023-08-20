import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Onboarding11Component } from './onboarding1.1/onboarding1.1.component';
import { Onboarding12Component } from './onboarding1.2/onboarding1.2.component';
import { Onboarding13Component } from './onboarding1.3/onboarding1.3.component';
import { Onboarding14Component } from './onboarding1.4/onboarding1.4.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { WorkComponent } from './work/work.component';
import { EducationComponent } from './education/education.component';
import { MediaComponent } from './media/media.component';
import { DragulaModule } from 'ng2-dragula';
const routes:Routes=[
{path:"",component:Onboarding11Component},
{path:"contact",component:ContactComponent},
{path:"work",component:WorkComponent},
{path:"education",component:EducationComponent},
{path:"media",component:MediaComponent},
// {path:"onboarding-1.3",component:Onboarding14Component},
{path:"onboarding-1.4",component:Onboarding12Component},
{path:"onboarding-1.2",component:Onboarding13Component},
]


@NgModule({
  declarations: [
    Onboarding11Component,
    Onboarding12Component,
    Onboarding13Component,
    Onboarding14Component,
    ContactComponent,
    WorkComponent,
    EducationComponent,
    MediaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileSetupModule { }
