import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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
            selector: 'child-crud',
            templateUrl: 'child-crud.html',
            })
export class ChildCRUD {
updates: FirebaseListObservable<any>;
childForm;
messages;
children;
possibleSuites: any;
hospitalCapacity = 40;
parentEmails;
users;
uid;

constructor(public platform: Platform,
                   public viewCtrl: ViewController,
                   public db: AngularFireDatabase) {

  this.updates = db.list('/updates');
  this.messages = db.list('/messages');
  this.children = db.list('/children');
  this.parentEmails = db.list('/users');

  this.users = firebase.database().ref('/users').orderByChild;


  this.possibleSuites = [];
  var i;
  for (i = 0; i < this.hospitalCapacity; i++) {
    this.possibleSuites.push(i+1);
  }

  this.childForm = new FormGroup({
                                    "childName": new FormControl({value: "", disabled: false}),
                                    "suite": new FormControl({value: -1, disabled: false}),
                                    "parentName": new FormControl({value: "", disabled: false}),
                                    "isActive": new FormControl({value: false, disabled: false}),
                                    "parentEmail": new FormControl({value: false, disabled: false}),
                                    });
  }

  doSubmit(event) {
    event.preventDefault();
    if(this.childForm.value.message != 'none') {
    var childcrud = this;

    var matchingUsers = firebase.database().ref('/users')
    .orderByChild('email')
    .equalTo(childcrud.childForm.value.parentEmail)
    matchingUsers.on("value", function(snapshot){
      for(var i in snapshot.val()){
        childcrud.uid = snapshot.val()[i].UID;
      }
    })

    this.children.push({
                       childName: this.childForm.value.childName,
                       parentName: this.childForm.value.parentName,
                       parentEmail: this.childForm.value.parentEmail,
                       parentUID: this.uid,
                       suite: this.childForm.value.suite,
                       isActive: this.childForm.value.isActive,
                       timestamp: 0 - new Date().getTime()
                     }).then(() => {
                       this.childForm.reset();
                     });
    }
  }

  dismiss(){
    this.childForm.reset();
  }

}
