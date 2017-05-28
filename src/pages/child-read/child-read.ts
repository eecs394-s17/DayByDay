import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
