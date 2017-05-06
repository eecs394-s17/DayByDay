import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'nurseHome.html'
})
export class NurseHome {
  updates: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public db: AngularFireDatabase) {
    this.updates = db.list('/updates');
  }
  addUpdate(){
    let prompt = this.alertCtrl.create({
    title: 'Update Name',
    message: "Message you would like to send here",
    inputs: [
      {
        name: 'content',
        placeholder: 'Enter your message here',
      },
    ],
    buttons: [
      { 
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.updates.push({
            content: data.content
          });
        }
      }
    ]
  });
  prompt.present();
}

}


