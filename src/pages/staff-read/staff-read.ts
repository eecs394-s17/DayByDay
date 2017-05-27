import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { staffEditor } from '../staff-editor/staff-editor';
import { staffAdd } from '../staff-add/staff-add'
import { staffEditor } from '../staff-editor/staff-editor'

/**
* Generated class for the NurseViewUpdates page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
            selector: 'staff-read',
            templateUrl: 'staff-read.html',
            })
export class staffRead {
  attendingStaff: any;
  nurseStaff: any;
  fellowStaff: any;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public viewCtrl: ViewController) {

    this.attendingStaff = db.list('/staff/attending', {
                             query: {
                             orderByChild: 'name'
                             }
                           });
    this.nurseStaff = db.list('/staff/nurse', {
                              query: {
                              orderByChild: 'name'
                              }
                            });
    this.fellowStaff = db.list('/staff/fellow', {
                             query: {
                             orderByChild: 'name'
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

  AddStaff(){
    this.navCtrl.push(staffAdd);
  }
  // Navigate to the existing child editor upon clicking any child card on the child-read page
  goToEditor(staff, type){
    console.log("Reached")
    this.navCtrl.push(staffEditor, {
      key: staff.$key,
      staffName: staff.name,
      staffType: type,
    });
  }

}
