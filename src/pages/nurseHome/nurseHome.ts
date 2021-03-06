import {Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { NurseViewUpdates } from '../nurse-view-updates/nurse-view-updates';
import { NurseSendUpdate } from '../nurse-send-update/nurse-send-update';
import { SignIn } from '../signIn/signIn';

import { AuthService } from '../../providers/auth-service';

@Component({
  templateUrl: 'NurseHome.html'
})
export class NurseHome {
    sendUpdate: any;
    viewUpdates: any;
  constructor(private auth: AuthService, public navCtrl: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'myMenu');

    this.sendUpdate = NurseSendUpdate;
    this.viewUpdates = NurseViewUpdates;

  }


  logout() {
    var that = this;
    this.auth.signOut().then(function() {
      that.navCtrl.setRoot(SignIn);
    }).catch(function(error) {
        console.log(error);
    });
  }
}
