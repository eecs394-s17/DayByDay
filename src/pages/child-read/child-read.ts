import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChildEditor } from '../child-editor/child-editor';

/**
* Generated class for the NurseViewUpdates page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
            selector: 'child-read',
            templateUrl: 'child-read.html',
            })
export class ChildRead {
  children: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController) {

    this.children = db.list('/children', {
                             query: {
                             orderByChild: 'childName'
                             }
                           });


    //reusable sort function creater
    var sort_by = function(field, reverse, primer){
      var key = function (x) {return primer ? primer(x[field]) : x[field]};

      return function (a,b) {
        var A = key(a), B = key(b);
        return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
      }
    }

  }
  // Navigate to the existing child editor upon clicking any child card on the child-read page
  goToEditor(child){
    console.log("Reached")
    this.navCtrl.push(ChildEditor, {
      key: child.$key,
      childName: child.childName,
      suite: child.suite,
      parentName: child.parentName,
      isActive: child.isActive,
      parentEmail: child.parentEmail,
    });
  }

}
