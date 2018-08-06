import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { NavbarLoginComponent } from './components/_mini-components/navbar/login/navbar.login.component';
import { ItemComponent } from './components/_mini-components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarHomeComponent } from './components/_mini-components/navbar/home/navbar.home.component';

/* Moment.js Angular Settings */
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
moment.locale('es');

import { Ng2IziToastModule } from 'ng2-izitoast';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { UserService } from './services/user.service';
import { PublicationService } from './services/publication.service';
import { CommentService } from './services/comment.service';
import { FollowerService } from './services/follower.service';
import { FileService } from './services/file.service';
import { LikeService } from './services/like.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginService } from './services/login.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { LoginReducer } from './ngrx/reducers/login.reducers';
import { environment } from '../environments/environment';
import { LoginEffects } from './ngrx/effects/login.effects';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { GroupComponent } from './components/group/group.component';
import { WebSocketService } from './services/websocket.service';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { NotificationComponent } from './components/notification/notification.component';
import { GroupService } from './services/group.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ModalFollowsComponent } from './components/_mini-components/modal-follows/modal-follows.component';
import { ModalReducer } from './ngrx/reducers/modal.reducers';
import { FilterUserPipeModule } from './pipes/filteruser.pipe';
import { NotificationService } from './services/notification.service';
import { NgProgressModule } from '@ngx-progressbar/core';

library.add(fas, far);

export const firebaseConfig = {
  apiKey: "AIzaSyDuvWG_3Ti64yKEuwc8i_c1X_peATm8Tv8",
  authDomain: "db-firebase-5cf99.firebaseapp.com",
  databaseURL: "https://db-firebase-5cf99.firebaseio.com",
  projectId: "db-firebase-5cf99",
  storageBucket: "db-firebase-5cf99.appspot.com",
  messagingSenderId: "980497524939"
};

const store = {
  login: LoginReducer,
  modal: ModalReducer
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarLoginComponent,
    NavbarHomeComponent,
    ModalFollowsComponent,
    ItemComponent,
    LoginComponent,
    ForgetPasswordComponent,
    HomeComponent,
    UserListComponent,
    UserProfileComponent,
    ChatComponent,
    GroupComponent,
    RegisterComponent,
    SettingComponent,
    NotificationComponent,
    FilterUserPipeModule
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    [StoreModule.forRoot(store)],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    // EffectsModule.forRoot([LoginEffects]),
    AppRoutingModule,
    Ng2IziToastModule,
    MomentModule,
    InfiniteScrollModule,
    NgProgressModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  providers: [
    GroupService,
    UserService,
    LoginService,
    PublicationService,
    CommentService,
    FollowerService,
    FileService,
    LikeService,
    NotificationService,
    WebSocketService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
