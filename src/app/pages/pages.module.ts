import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserContentsComponent } from './user-contents/user-contents.component';
import { AddContentComponent } from './add-content/add-content.component';
import { authGuardGuard } from '../guards/auth-guard.guard';
import { loginGuard } from '../guards/login.guard';
import { EditContentComponent } from './edit-content/edit-content.component';
import { ShowContentComponent } from './show-content/show-content.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      {
        path: '',
        component: UserLoginComponent,
        canActivate:[loginGuard]
      },
      {
        path: 'register',
        component: UserSignupComponent,
        canActivate:[loginGuard]
      },
      {
        path: 'feed',
        component: UserFeedComponent,
        canActivate:[authGuardGuard]
      },
      {
        path: 'myArticles',
        component:UserContentsComponent,
        canActivate:[authGuardGuard]
      },
      {
        path: 'add-article',
        component:AddContentComponent,
        canActivate:[authGuardGuard]
      },
      {
        path: 'edit-article/:id',
        component: EditContentComponent,
        canActivate:[authGuardGuard]
      },
      {
        path: 'show-article/:id',
        component: ShowContentComponent,
        canActivate:[authGuardGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo:'/'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
