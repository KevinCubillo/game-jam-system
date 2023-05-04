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
    path: 'main',
    component: JamsViewComponent
  },
  {
    path: 'create/jam',
    component: FormJamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
