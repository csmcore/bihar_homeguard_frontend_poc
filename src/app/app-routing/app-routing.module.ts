import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from '../admin/login/login.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { ApplicationFormOneComponent } from '../admin/application-form-one/application-form-one.component';
import { ApplicationFormTwoComponent } from '../admin/application-form-two/application-form-two.component';
import { CandidateProfileComponent } from '../admin/candidate-profile/candidate-profile.component';
import { AppicationformthreeComponent } from '../admin/appicationformthree/appicationformthree.component';
import { ForgotPasswordComponent } from '../admin/forgot-password/forgot-password.component';
import { AdmitCardComponent } from '../admin/admit-card/admit-card.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'form-one', component: ApplicationFormOneComponent },
    { path: 'form-two', component: ApplicationFormTwoComponent },
    { path: 'form-three', component: AppicationformthreeComponent },
    { path: 'candidate-profile', component: CandidateProfileComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'admit-card', component: AdmitCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log("AppRoutingModule loaded");
  }
}
