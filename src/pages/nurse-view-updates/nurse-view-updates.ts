import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/**
* Generated class for the NurseViewUpdates page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-nurse-view-updates',
  templateUrl: 'nurse-view-updates.html',
})
export class NurseViewUpdates {
  updates: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {

    this.updates = db.list('/updates', {
      query: {
        orderByChild: 'timestamp'
      }
    });


    //reusable sort function creater
    var sort_by = function(field, reverse, primer) {
      var key = function(x) { return primer ? primer(x[field]) : x[field] };

      return function(a, b) {
        var A = key(a), B = key(b);
        return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
      }
    }

  }
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
}
