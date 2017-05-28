import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class Staff {

  attendingStaff: any;
  nurseStaff: any;
  fellowStaff: any;



  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.attendingStaff = db.list('/staff/attending')
    this.nurseStaff = db.list('/staff/nurse')
    this.fellowStaff = db.list('/staff/fellow')
  }

  ionViewDidLoad() {

  }

}
