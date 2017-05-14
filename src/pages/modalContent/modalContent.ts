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
    children;

    constructor(public platform: Platform,
        public viewCtrl: ViewController,
        public db: AngularFireDatabase) {

      this.updates = db.list('/updates');

      this.messages = db.list('/messages');
      this.children = db.list('/children');

      this.messageForm = new FormGroup({
          "child": new FormControl({value: 'none', disabled: false}),
          "message": new FormControl({value: 'none', disabled: false}),
      });
    }

    doSubmit(event) {
      event.preventDefault();
      if(this.messageForm.value.message != 'none') {
        this.updates.push({
          content: this.messageForm.value.message,
          child: this.messageForm.value.child,
          timestamp: new Date().getTime(),
          updateType: ""
        });
      }
      this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
