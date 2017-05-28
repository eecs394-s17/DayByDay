import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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

  colorDayNight(DayNight, event){
    if (DayNight == "day"){
      this.selectedDay(event);
    }
    else if (DayNight == "night"){
      this.selectedNight(event);
    }
    return DayNight;
  }

  selectedDay(event){
    event.currentTarget.parentElement.parentElement.setAttribute("style","background-color:#FEC83E");
  }

  selectedNight(event){
    event.currentTarget.parentElement.parentElement.setAttribute("style","background-color:#90CAF8");

  }
}
