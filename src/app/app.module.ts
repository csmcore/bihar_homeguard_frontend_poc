import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ApplicationRegisterService } from './admin/Service/application-register.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ApplicationFormOneComponent } from './admin/application-form-one/application-form-one.component';
import { ApplicationFormTwoComponent } from './admin/application-form-two/application-form-two.component';
import { CandidateProfileComponent } from './admin/candidate-profile/candidate-profile.component';
import { AppicationformthreeComponent } from './admin/appicationformthree/appicationformthree.component';
import { AdmitCardComponent } from './admin/admit-card/admit-card.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationFormOneComponent,
    ApplicationFormTwoComponent,
    CandidateProfileComponent,
    AppicationformthreeComponent,
    AdmitCardComponent,
    ForgotPasswordComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  providers:[HttpClient],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(){
    console.log("AppModule loaded");
  }
}
