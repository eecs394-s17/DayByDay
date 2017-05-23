import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  templateUrl: 'parentHome.html'
})
export class ParentHome {
  updates: FirebaseListObservable<any>;
  processedUpdates: any;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase) {
      this.updates = db.list('/updates', {
        query: {
          orderByChild: 'timestamp'
        }
      });
    }
    

    timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var meridian;
      if (hour > 12) {
        hour = hour - 12;
        meridian = 'pm';
      }
      else if (hour == 12) {
        meridian = 'pm';
      }
      else if (hour == 0) {
        hour = 12;
        meridian = 'am';
      }
      else {
        meridian = 'am';
      }

      var min = a.getMinutes();
      var minStr;
      if (min < 10) {
        minStr = '0' + min;
      }
      else {
        minStr = min;
      }
      var time = month + ' ' + date + ' at ' + hour + ':' + minStr + ' ' + meridian;
      return time;
    }

    //reusable sort function creater
    /*
    var sort_by = function(field, reverse, primer){
       var key = function (x) {return primer ? primer(x[field]) : x[field]};

       return function (a,b) {
    	  var A = key(a), B = key(b);
    	  return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
       }
    }
    */

  
}
