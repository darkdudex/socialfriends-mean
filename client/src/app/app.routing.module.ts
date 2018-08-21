import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { GroupComponent } from './components/group/group.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { NotificationComponent } from './components/notification/notification.component';
import { GroupCreateComponent } from './components/group/group-create/group-create.component';
import { GroupProfileComponent } from './components/group/group-profile/group-profile.component';
import { GroupTypeComponent } from './components/group/group-type/group-type.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'userlist',
    component: UserListComponent
  },
  {
    path: 'profile/:username',
    component: UserProfileComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'group/create',
    component: GroupCreateComponent
  }, {
    path: 'group/profile',
    component: GroupProfileComponent
  }, {
    path: 'group/type',
    component: GroupTypeComponent
  }, {
    path: '**',
    component: LoginComponent
  },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);