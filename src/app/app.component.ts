import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, MenuController, Nav } from 'ionic-angular';

import {HospitalInfo} from '../pages/hospitalInfo/hospitalInfo';
import { ParentHome } from '../pages/parentHome/parentHome';
import { NurseHome } from '../pages/nurseHome/nurseHome';
import { SignIn } from '../pages/signIn/signIn';
import { ModalContent } from '../pages/modalContent/modalContent';
import { Staff } from '../pages/staff/staff';
import { SuiteSelection } from '../pages/suiteSelection/suiteSelection';
import { ChildManagement } from '../pages/child-management/child-management'
import { ChildEditor } from '../pages/child-editor/child-editor'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = SignIn;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController,
) {
    platform.ready().then(() => {
    this.pages = [
      { title: 'Home', component: ParentHome },
      { title: 'Information', component: HospitalInfo },
      { title: 'Staff', component: Staff },
      { title: 'Nurse Updates', component: NurseHome },
      { title: 'Child Management', component: ChildManagement },
    ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
