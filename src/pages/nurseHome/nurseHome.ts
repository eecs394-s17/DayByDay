import {Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ModalContent} from '../modalContent/modalContent'

@Component({
  templateUrl: 'NurseHome.html'
})
export class NurseHome {
  updates: FirebaseListObservable<any>;

  constructor(public modalCtrl: ModalController, public db: AngularFireDatabase) {

    this.updates = db.list('/updates', {
      query: {
        orderByChild: 'timestamp'
      }
    });


    //reusable sort function creater
    var sort_by = function(field, reverse, primer){
       var key = function (x) {return primer ? primer(x[field]) : x[field]};

       return function (a,b) {
    	  var A = key(a), B = key(b);
    	  return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
       }
    }

  }
  addUpdate(){
    let modal = this.modalCtrl.create(ModalContent);
    modal.present();
}

}
