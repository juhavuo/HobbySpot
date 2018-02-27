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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChannelsPage,
    ThumbnailPipe
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
    ChannelsPage
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
