import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireDatabase} from 'angularfire2/database';

import { MyApp } from './app.component';
import { HospitalInfo }from '../pages/hospitalInfo/hospitalInfo';
import { ParentHome } from '../pages/parentHome/parentHome';
import { NurseHome } from '../pages/nurseHome/nurseHome';
import { SignIn } from '../pages/signIn/signIn';
import { ModalContent } from '../pages/modalContent/modalContent';
import { Staff } from '../pages/staff/staff';
import { CommonProcedures } from '../pages/commonProcedures/commonProcedures';
import { SuiteSelection } from '../pages/suiteSelection/suiteSelection';


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
    ParentHome,
    NurseHome,
    SignIn,
    ModalContent,
    HospitalInfo,
    Staff,
    CommonProcedures,
    SuiteSelection
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NurseHome,
    ParentHome,
    SignIn,
    ModalContent,
    HospitalInfo,
    Staff,
    CommonProcedures,
    SuiteSelection
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
