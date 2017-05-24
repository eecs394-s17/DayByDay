import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireDatabase} from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HospitalInfo }from '../pages/hospitalInfo/hospitalInfo';
import { ParentHome } from '../pages/parentHome/parentHome';
import { NurseHome } from '../pages/nurseHome/nurseHome';
import { NurseViewUpdates } from '../pages/nurse-view-updates/nurse-view-updates';
import { NurseSendUpdate } from '../pages/nurse-send-update/nurse-send-update';
import { SignIn } from '../pages/signIn/signIn';
import { SignupPage } from '../pages/SignupPage/SignupPage'
import { ModalContent } from '../pages/modalContent/modalContent';
import { Staff } from '../pages/staff/staff';
import { CommonProcedures } from '../pages/hospitalInfo/commonProcedures/commonProcedures';
import { Dining } from '../pages/hospitalInfo/dining/dining';
import { GuestPolicies } from '../pages/hospitalInfo/guestPolicies/guestPolicies';
import { ParentSupportSystems } from '../pages/hospitalInfo/parentSupportSystems/parentSupportSystems';
import { TypesOfProviders } from '../pages/hospitalInfo/typesOfProviders/typesOfProviders';
import { SuiteSelection } from '../pages/suiteSelection/suiteSelection';
import { ChildManagement } from '../pages/child-management/child-management';
import { ChildCRUD } from '../pages/child-crud/child-crud';
import { ChildRead } from '../pages/child-read/child-read';
import { ChildEditor } from '../pages/child-editor/child-editor';




import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service';

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
    SignupPage,
    ModalContent,
    HospitalInfo,
    Staff,
    CommonProcedures,
    Dining,
    GuestPolicies,
    ParentSupportSystems,
    TypesOfProviders,
    NurseViewUpdates,
    NurseSendUpdate,
    SuiteSelection,
    ChildManagement,
    ChildCRUD,
    ChildRead,
    ChildEditor,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ParentHome,
    NurseHome,
    SignIn,
    SignupPage,
    ModalContent,
    HospitalInfo,
    Staff,
    CommonProcedures,
    Dining,
    GuestPolicies,
    ParentSupportSystems,
    TypesOfProviders,
    NurseViewUpdates,
    NurseSendUpdate,
    SuiteSelection,
    ChildManagement,
    ChildCRUD,
    ChildRead,
    ChildEditor,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
