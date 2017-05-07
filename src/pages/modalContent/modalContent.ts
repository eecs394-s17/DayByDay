import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'modalContent.html'
})
export class ModalContent {
    updates: FirebaseListObservable<any>;
    messageForm;
    messages;

    constructor(public platform: Platform,
        public viewCtrl: ViewController,
        public db: AngularFireDatabase) {
      this.updates = db.list('/updates');

      this.messageForm = new FormGroup({
        "message": new FormControl({value: 'none', disabled: false})
      });

      this.messages = [
        {
          message: 'Liz is your child\'s nurse for this shift'
        },
        {
          message: 'Dr. Danna is the fellow taking care of your child on this shift'
        },
        {
          message: 'Craig is the attending taking care of your child for this shift'
        }

      ]
    }

    doSubmit(event) {
      event.preventDefault();
      if(this.messageForm.value.message != 'none') {
        this.updates.push({
            content: this.messageForm.value.message,
            timestamp: new Date().getTime()
        });
      }
      this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
