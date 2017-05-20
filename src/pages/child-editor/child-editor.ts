import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';


@IonicPage()
@Component({
    templateUrl: 'child-editor.html'
})
export class ChildEditor {
    public key;
    public childName;
    public parentName;
    public suite;
    public isActive;
    children;
    childForm;
    possibleSuites;
    hospitalCapacity = 40

    constructor(public platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, public db: AngularFireDatabase) {

        this.children = db.list('/children');
        this.possibleSuites = [];
        var i;
        for (i = 0; i < this.hospitalCapacity; i++) {
          this.possibleSuites.push(i+1);
        }

        this.key = params.get("key");
        this.childName = params.get("childName");
        this.parentName = params.get("parentName");
        this.suite = params.get("suite");
        this.isActive = params.get("isActive")

        this.childForm = new FormGroup({
                                          "childName": new FormControl({value: this.childName, disabled: false}),
                                          "suite": new FormControl({value: this.suite, disabled: false}),
                                          "parentName": new FormControl({value: this.parentName, disabled: false}),
                                          "isActive": new FormControl({value: this.isActive, disabled: false}),
                                          });

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    confirmDelete(){
      let confirm = this.alertCtrl.create({
        title: 'Confirm Deletion',
        message: 'Sure you want to DELETE the record? This cannot be undone later',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: () => {
              event.preventDefault();
                this.children.remove(this.key).then(
                                   this.viewCtrl.dismiss()
                                 );
              console.log('User clicked confirm delete');
            }
          }
        ]
      });
      confirm.present();
    }

    confirmEdit(){

        let confirm = this.alertCtrl.create({
          title: 'Confirm edits',
          message: 'Sure you want to edit the record?',
          buttons: [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              handler: () => {
                event.preventDefault();
                if(this.childForm.value.message != 'none') {
                  this.children.update(this.key, {
                                     childName: this.childForm.value.childName,
                                     parentName: this.childForm.value.parentName,
                                     suite: this.childForm.value.suite,
                                     isActive: this.childForm.value.isActive,
                                     timestamp: 0 - new Date().getTime()
                                   }).then(
                                     this.viewCtrl.dismiss()
                                   );
                }
                console.log('User clicked confirm');
              }
            }
          ]
        });
        confirm.present();
    }
}
