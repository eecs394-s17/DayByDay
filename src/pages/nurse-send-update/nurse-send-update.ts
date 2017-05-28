import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Platform, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';
import { NurseHome } from '../nurseHome/nurseHome'

/**
* Generated class for the NurseSendUpdate page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
            selector: 'page-nurse-send-update',
            templateUrl: 'nurse-send-update.html',
            })
export class NurseSendUpdate {
updates: FirebaseListObservable<any>;
messageForm;
messages;
children;
attending;
fellow;
nurse;
specialists;
roundtimes;
overnight;
mood;
other;
roundTime: any;
displayRoundTime: any;

constructor(public platform: Platform,
                   public viewCtrl: ViewController,
                   public db: AngularFireDatabase,
                 public navCtrl: NavController) {

this.updates = db.list('/updates');
this.messages = db.list('/messages');
this.children = db.list('/children');
this.attending = db.list('/staff/attending');
this.fellow = db.list('/staff/fellow');
this.nurse = db.list('/staff/nurse');
this.specialists = db.list('/specialists');
this.roundtimes = db.list('/roundtimes');
this.overnight = db.list('/overnight');
this.mood = db.list('/mood');
this.other = db.list('/other');

this.displayRoundTime = 'none';


this.messageForm = new FormGroup({
                                  "child": new FormControl({value: 'none', disabled: false}),
                                  "session": new FormControl({value: 'none', disabled: false}),
                                  "attendingStaff": new FormControl({value: 'none', disabled: false}),
                                  "fellowStaff": new FormControl({value: 'none', disabled: false}),
                                  "nurseStaff": new FormControl({value: 'none', disabled: false}),
                                  "Specialist": new FormControl({value: 'none', disabled: false}),
                                  "Overnight": new FormControl({value: 'none', disabled: false}),
                                  "Mood": new FormControl({value: 'none', disabled: false}),
                                  "Other": new FormControl({value: 'none', disabled: false}),
                                  });
}

  dismiss(){
    this.messageForm.reset({
                            "child": 'none',
                            "session": 'none',
                            "attendingStaff": 'none',
                            "fellowStaff": 'none',
                            "nurseStaff": 'none',
                            "Specialist": 'none',
                            "Overnight": 'none',
                            "Mood": 'none',
                            "Other": 'none',
                            });
    this.resetToWhite();
    this.displayRoundTime = 'none';
  }
//update this function to reflect new variable names

  doSubmit(event) {
    event.preventDefault();
    if(this.messageForm.value.message != 'none') {
    this.updates.push({
                       session: this.messageForm.value.session,
                       child: this.messageForm.value.child,
                       timestamp: 0 - new Date().getTime(),
                       mood: this.messageForm.value.Mood,
                       Other: this.messageForm.value.Other,
                       overnight: this.messageForm.value.Overnight,
                       specialist: this.messageForm.value.Specialist,
                       displayRoundTime: this.displayRoundTime,
                       nurseStaff: this.messageForm.value.nurseStaff,
                       fellowStaff: this.messageForm.value.fellowStaff,
                       attendingStaff: this.messageForm.value.attendingStaff,
                     }).then(()=> {
                       this.navCtrl.setRoot(NurseHome);
                     });

    }
  }

  timestamp() {
    var d = new Date();
    var n = d.toISOString();
    return this.timeConverter(n);
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

  selectedDay(){
    var x = document.getElementsByClassName("colorDayNight");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].setAttribute("style","background-color:#FEC83E");
    }
  }

  selectedNight(){
    var x = document.getElementsByClassName("colorDayNight");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].setAttribute("style","background-color:#CFD8DC");
    }
  }

  resetToWhite(){
    var x = document.getElementsByClassName("colorDayNight");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].setAttribute("style","background-color:#FFFFFF");
    }
  }

  setDisplayRoundTime() {
    // have to convert 24 hour time
    var time = this.roundTime.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
     
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM
    
    this.displayRoundTime = timeValue;
  }

}
