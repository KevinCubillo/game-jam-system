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
import { TableJamComponent } from './components/table-jam/table-jam.component';

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
    component: PublicComponent
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
    path: 'assign/mentor',
    component: AssignMentorTableComponent
  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
