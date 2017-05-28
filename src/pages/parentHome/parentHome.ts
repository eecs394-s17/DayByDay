import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SignIn } from '../signIn/signIn';
import * as firebase from 'firebase/app';

import { AuthService } from '../../providers/auth-service';

@Component({
  templateUrl: 'parentHome.html'
})
export class ParentHome {
  updates: FirebaseListObservable<any>;
  processedUpdates: any;
  foreignKey: any;
  // matchChild: any;
  // matchParent: any;
  mychild: any;
  lastLogin: any;
  users;
  UID;
  email;
  parentName;
  key;

  constructor(public alertCtrl: AlertController,
      public db: AngularFireDatabase,
      public params: NavParams,
      public navCtrl: NavController,
      private auth: AuthService,
      public menuCtrl: MenuController) {
      this.menuCtrl.enable(true, 'myMenu');

      this.updates = db.list('/updates', {
        query: {
          orderByChild: 'timestamp'
        }
      });

      // foreign key is the parent email
      // this.foreignKey = params.get("foreignKey");
      this.UID = this.auth.getFirebaseId()

      this.mychild = [];

      var parenthome = this;

      var matchChild = firebase.database().ref('/children')
      .orderByChild("parentUID")
      .equalTo(parenthome.UID)
      matchChild.on("value", function(snapshot){
        for(var i in snapshot.val()){
          parenthome.mychild.push(snapshot.val()[i].childName)
        }
      })

      this.updatelastLogin()
    }

    updatelastLogin(){
      var parenthome = this;
      // this.users = this.db.list('/users')
      // console.log('UID',this.UID)

      var matchParent = firebase.database().ref('/users')
      .orderByChild("UID")
      .equalTo(parenthome.UID)
      matchParent.once("value", function(snapshot){
        for(var i in snapshot.val()){
          parenthome.key = Object.keys(snapshot.val())[0];
          parenthome.email = snapshot.val()[i].email;
          parenthome.parentName = snapshot.val()[i].parentName;
        }
      });

      // this.db.list('/users').update(this.key, {
      //                    UID: this.UID,
      //                    email: this.email,
      //                    parentName: this.parentName,
      //                    type: 'parent',
      //                    lastLogin: 0 - new Date().getTime()
      //                  });
    }

    timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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

    logout() {
        var that = this;
        this.auth.signOut().then(function() {
            that.navCtrl.setRoot(SignIn);
        }).catch(function(error) {
            console.log(error);
        });
    }
}
