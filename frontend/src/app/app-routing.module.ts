import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import {PublicComponent } from './components/public/public.component';
import {PrivateComponent} from './components/private/private.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {JamsViewComponent} from './components/jams-view/jams-view.component';

import { AuthGuard } from './auth.guard';
import { FormJamComponent } from './components/form-jam/form-jam.component';
import { FormSiteComponent } from './components/form-site/form-site.component';
import { TableJamComponent } from './components/table-jam/table-jam.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { SingleJamViewComponent } from './components/single-jam-view/single-jam-view.component';

import { ProfileComponent } from './components/profile/profile.component';
import { AssignMentorTableComponent } from './components/assign-mentor-table/assign-mentor-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/public',
    pathMatch: 'full'
  },
  {
    path: 'public',
    component: JamsViewComponent
  },
  {
    path: 'private' ,
    component: PrivateComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path:'profile',
    component: ProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path:'user/:id',
    component: ProfileComponent,
  },
  {
    path: 'main',
    component: JamsViewComponent
  },
  {
    path: 'create/jam',
    component: FormJamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list/jam',
    component: TableJamComponent
  },
  {
    path: 'update/jam/:id',
    component: FormJamComponent
  },
  {
    path: 'singlejam/:id',
    component: SingleJamViewComponent
  },
  {
    path: 'create/site',
    component: FormSiteComponent
  },
  {
    path: 'update/site/:id',
    component: FormSiteComponent
  },
  {
    path: 'assign/mentor',
    component: AssignMentorTableComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
