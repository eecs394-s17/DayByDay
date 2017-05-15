import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  templateUrl: 'parentHome.html'
})
export class ParentHome {
  updates: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase) {
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
}
