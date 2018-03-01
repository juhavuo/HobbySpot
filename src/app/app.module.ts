import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ChannelsPage} from "../pages/channels/channels";
import { MediaProvider } from '../providers/media/media';
import {HttpClientModule} from "@angular/common/http";
import {ThumbnailPipe} from "../pipes/thumbnail/thumbnail";
import {LoginPage} from "../pages/login/login";
import {CategoriesPage} from "../pages/categories/categories";
import {RegisterPage} from '../pages/register/register';
import {UploadPage} from '../pages/upload/upload';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChannelsPage,
    LoginPage,
    CategoriesPage,
    ThumbnailPipe,
    RegisterPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChannelsPage,
    CategoriesPage,
    LoginPage
    RegisterPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    ThumbnailPipe
  ]
})
export class AppModule {}
