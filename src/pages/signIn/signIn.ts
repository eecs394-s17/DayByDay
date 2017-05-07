import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { ParentHome } from '../parentHome/parentHome';
import { NurseHome } from '../nurseHome/nurseHome';

@Component({
  templateUrl: 'signIn.html'

})
export class SignIn {
  nurseHome = NurseHome;
  parentHome = ParentHome;
  email: any;
  password: any;

  updates: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase) {
    this.updates = db.list('/updates');
  }

  handleSignin() {
    console.log(this.email);
    console.log(this.password);
  }

}


