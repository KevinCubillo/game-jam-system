import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrivateComponent } from './components/private/private.component';



import { AuthGuard } from './auth.guard';
import { JamsViewComponent } from './components/jams-view/jams-view.component';
import { FormJamComponent } from './components/form-jam/form-jam.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableJamComponent } from './components/table-jam/table-jam.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { SingleJamViewComponent } from './components/single-jam-view/single-jam-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormSiteComponent } from './components/form-site/form-site.component';
import { AssignMentorTableComponent } from './components/assign-mentor-table/assign-mentor-table.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PrivateComponent,
    JamsViewComponent,
    FormJamComponent,
    TableJamComponent,
    UpdateFormComponent,
    ProfileComponent,
    AssignMentorTableComponent,
    SingleJamViewComponent,
    ProfileComponent,
    FormSiteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule


  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
