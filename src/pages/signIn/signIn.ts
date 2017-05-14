import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { ParentHome } from '../parentHome/parentHome';
import { NurseHome } from '../nurseHome/nurseHome';
import { Platform, MenuController, Nav } from 'ionic-angular';

@Component({
  templateUrl: 'signIn.html'

})
export class SignIn {
  nurseHome = NurseHome;
  parentHome = ParentHome;

  updates: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase, public navCtrl: NavController) {
    //Get database list of messages
    this.updates = db.list('/updates');
  }

openNewRoot(page) {
    this.navCtrl.setRoot(page);
  }

}
