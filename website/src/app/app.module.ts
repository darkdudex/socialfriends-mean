import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';

//#region Services 
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { PublicationService } from './services/publication.service';
import { FileService } from './services/file.service';
import { FollowerService } from './services/follower.service';
import { CommentService } from './services/comment.service';
//#endregion

//#region Components 
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { UserProfileComponent } from './components/userprofile/userprofile.component';
//#endregion

import { appRouting } from './app.routing';

/* Moment.js Angular Settings */
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
moment.locale('es');

import { FilterUserPipe } from './pipes/filterUser.pipe'
import { LikeService } from './services/like.service';
import { ModalUtilityComponent } from './components/modal-utilitiy/modalutility.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    UserProfileComponent,
    ModalUtilityComponent,
    FilterUserPipe
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    appRouting
  ],
  providers: [
    UserService,
    LoginService,
    PublicationService,
    FollowerService,
    FileService,
    CommentService,
    LikeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
