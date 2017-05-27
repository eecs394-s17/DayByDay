import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';


/**
* Generated class for the ChildManagement page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
            selector: 'staff-add',
            templateUrl: 'staff-add.html',
            })
export class staffAdd {
stafftypes;
staffForm;

constructor(public platform: Platform,
                   public viewCtrl: ViewController,
                   public db: AngularFireDatabase, params: NavParams) {

  this.stafftypes = db.list('/staff');

  this.staffForm = new FormGroup({
                                    "staffName": new FormControl({value: "", disabled: false}),
                                    "staffType": new FormControl({value: -1, disabled: false}),
                                    });
  }

  doSubmit(event) {
    event.preventDefault();
    if(this.staffForm.value.message != 'none') {
    var staffToAdd = this.db.list('/staff/'+this.staffForm.value.staffType)
    staffToAdd.push({
                     name: this.staffForm.value.staffName,
                   }).then(() => {
                     this.staffForm.reset();
                   });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }
}
