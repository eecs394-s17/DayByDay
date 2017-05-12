import {Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ModalContent} from '../modalContent/modalContent'

@Component({
  templateUrl: 'hospitalInfo.html'
})
export class HospitalInfo {
  updates: FirebaseListObservable<any>;

  constructor(public modalCtrl: ModalController, public db: AngularFireDatabase) {
    this.updates = db.list('/updates');
  }
  addUpdate(){
    let modal = this.modalCtrl.create(ModalContent);
    modal.present();
}

}


