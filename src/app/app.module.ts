import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireDatabase} from 'angularfire2/database';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ModalContentPage} from '../pages/home/modal-content-page'

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCdWTrzsyttCyyHDLiHx33_VydZIJs1qkY",
  authDomain: "daybyday-d02a1.firebaseapp.com",
  databaseURL: "https://daybyday-d02a1.firebaseio.com",
  projectId: "daybyday-d02a1",
  storageBucket: "daybyday-d02a1.appspot.com",
  messagingSenderId: "318676897342"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalContentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
