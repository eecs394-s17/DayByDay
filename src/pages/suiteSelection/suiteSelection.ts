import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { NurseHome } from '../nurseHome/nurseHome';


@Component({
  templateUrl: 'suiteSelection.html'
})
export class SuiteSelection {
  nurseHome = NurseHome;

  updates: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase, public navCtrl: NavController) {
    this.updates = db.list('/children', {
      query: {
        orderByChild: 'suite'
      }
    });



  }
  openNewRoot(page) {
    this.navCtrl.setRoot(page);
  }

}