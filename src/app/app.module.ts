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
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {UploadPage} from '../pages/upload/upload';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {TabsPage} from '../pages/tabs/tabs';
import {LogoutPage} from '../pages/logout/logout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChannelsPage,
    ThumbnailPipe,
    LoginPage,
    RegisterPage,
    UploadPage,
    AboutPage,
    ContactPage,
    TabsPage,
    LogoutPage
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
    LoginPage,
    RegisterPage,
    UploadPage,
    AboutPage,
    ContactPage,
    TabsPage,
    LogoutPage
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
