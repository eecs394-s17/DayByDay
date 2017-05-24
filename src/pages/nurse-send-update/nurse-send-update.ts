import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    this.messageForm.reset();
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
                       nurseStaff: this.messageForm.value.nurseStaff,
                       fellowStaff: this.messageForm.value.fellowStaff,
                       attendingStaff: this.messageForm.value.attendingStaff,
                     }).then(()=> {
                       this.navCtrl.setRoot(NurseHome);
                     });

    }
  }
}
