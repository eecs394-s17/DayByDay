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
  matchChild: any;
  mychild: any;

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
      this.foreignKey = params.get("foreignKey");
      // console.log("myemail",this.foreignKey)
      var parenthome = this;
      this.matchChild = firebase.database().ref('/children')
      .orderByChild("parentEmail")
      .equalTo(parenthome.foreignKey)
      this.matchChild.on("value", function(snapshot){
        for(var i in snapshot.val()){
          parenthome.mychild = snapshot.val()[i].childName;
        }
      })
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

    //reusable sort function creater
    /*
    var sort_by = function(field, reverse, primer){
       var key = function (x) {return primer ? primer(x[field]) : x[field]};

       return function (a,b) {
    	  var A = key(a), B = key(b);
    	  return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
       }
    }
    */

    logout() {
        var that = this;
        this.auth.signOut().then(function() {
            that.navCtrl.setRoot(SignIn);
        }).catch(function(error) {
            console.log(error);
        });
    }
}
