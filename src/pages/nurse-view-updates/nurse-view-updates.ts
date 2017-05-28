import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


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
  children: FirebaseListObservable<any>;
  childFilter: any;

  constructor(public db: AngularFireDatabase) {
    this.children = db.list('/children');
    this.updates = db.list('/updates', {
      query: {
        orderByChild: 'timestamp',
      }
    });
  }

  Seen(child, cardTime){
    var uid;
    var matchChild = firebase.database().ref('/children')
    .orderByChild("childName")
    .equalTo(child)
    matchChild.on("value", function(snapshot){
      for(var i in snapshot.val()){
        uid = snapshot.val()[i].parentUID;
      }
    });

    var lastLogin;

    var matchParent = firebase.database().ref('/users')
    .orderByChild("UID")
    .equalTo(uid)
    matchParent.on("value", function(snapshot){
      for(var i in snapshot.val()){
        lastLogin = snapshot.val()[i].lastLogin;
      }
    });

    if (-lastLogin>-cardTime){
      return "Seen • "
    }
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
