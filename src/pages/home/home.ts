import {Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ModalContentPage} from './modal-content-page'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  updates: FirebaseListObservable<any>;

  constructor(public modalCtrl: ModalController, public db: AngularFireDatabase) {
    this.updates = db.list('/updates');
  }
  addUpdate() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }
}


