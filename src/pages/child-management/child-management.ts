import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';
import { ChildCRUD } from '../child-crud/child-crud';
import { ChildRead } from '../child-read/child-read';

/**
* Generated class for the ChildManagement page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
  templateUrl: 'child-management.html'
})
export class ChildManagement {
    cud: any;
    read: any;
  constructor() {
    this.cud = ChildCRUD;
    this.read = ChildRead ;
  }
}

// @IonicPage()
// @Component({
//             selector: 'child-management',
//             templateUrl: 'child-management.html',
//             })
// export class ChildManagement {
// updates: FirebaseListObservable<any>;
// childForm;
// messages;
// children;
// possibleSuites: any;
// hospitalCapacity = 40;
//
// constructor(public platform: Platform,
//                    public viewCtrl: ViewController,
//                    public db: AngularFireDatabase) {
//
//   this.updates = db.list('/updates');
//   this.messages = db.list('/messages');
//   this.children = db.list('/children');
//
//   this.possibleSuites = [];
//   var i;
//   for (i = 0; i < this.hospitalCapacity; i++) {
//     this.possibleSuites.push(i);
//   }
//
//   this.childForm = new FormGroup({
//                                     "childName": new FormControl({value: "", disabled: false}),
//                                     "suite": new FormControl({value: -1, disabled: false}),
//                                     "parentName": new FormControl({value: "", disabled: false}),
//                                     "isActive": new FormControl({value: false, disabled: false}),
//                                     });
//   }
//
//   doSubmit(event) {
//     event.preventDefault();
//     if(this.childForm.value.message != 'none') {
//     this.children.push({
//                        childName: this.childForm.value.childName,
//                        parentName: this.childForm.value.parentName,
//                        suite: this.childForm.value.suite,
//                        isActive: this.childForm.value.isActive,
//                        timestamp: 0 - new Date().getTime()
//                        });
//     }
//   }
//
//   dismiss(){
//
//   }
//
// }
