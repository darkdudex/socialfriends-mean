
//#region Modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MomentModule } from 'angular2-moment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgProgressModule } from '@ngx-progressbar/core';
import { FilterUserPipeModule } from './pipes/filteruser.pipe';
//#endregion

//#region Components 
import { AppComponent } from './app.component';
import { NavbarLoginComponent } from './components/_mini-components/navbar/login/navbar.login.component';
import { ItemComponent } from './components/_mini-components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarHomeComponent } from './components/_mini-components/navbar/home/navbar.home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { GroupComponent } from './components/group/group.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ModalFollowsComponent } from './components/_mini-components/modal-follows/modal-follows.component';
import { GroupCreateComponent } from './components/group/group-create/group-create.component';
import { GroupProfileComponent } from './components/group/group-profile/group-profile.component';
import { GroupTypeComponent } from './components/group/group-type/group-type.component';
//#endregion

//#region Services 
import { UserService } from './services/user.service';
import { PublicationService } from './services/publication.service';
import { CommentService } from './services/comment.service';
import { FollowerService } from './services/follower.service';
import { FileService } from './services/file.service';
import { LikeService } from './services/like.service';
import { LoginService } from './services/login.service';
import { GroupService } from './services/group.service';
import { NotificationService } from './services/notification.service';
import { SocialLoginService } from './services/social.login.service';
import { SocketService } from './services/socket.service';
//#endregion 

//#region ngrx settings (Redux) 
import { ModalReducer } from './ngrx/reducers/modal.reducers';
import { CommentReducer } from './ngrx/reducers/comment.reducers';
import { LoginReducer } from './ngrx/reducers/login.reducers';
import { LoginEffects } from './ngrx/effects/login.effects';

const store = {
  login: LoginReducer,
  modal: ModalReducer,
  comment: CommentReducer
}
//#endregion

//#region Other settings 
import { environment } from '../environments/environment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';

moment.locale('es');
library.add(fas, far);
//#endregion

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
    FilterUserPipeModule,
    GroupCreateComponent,
    GroupProfileComponent,
    GroupTypeComponent
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
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
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
    SocketService,
    SocialLoginService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
