import { Component } from '@angular/core';
import { NavParams, Platform, IonicPage, NavController, AlertController, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  templateUrl: 'staff-editor.html'
})
export class staffEditor {
  staffTypes;
  staffForm;
  currStaffName;
  key;
  currStaffType;


  constructor(public platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, public db: AngularFireDatabase) {

    this.currStaffName = params.get("staffName")
    this.key = params.get("key")
    this.currStaffType = params.get("staffType")

    this.staffTypes = db.list('/staff')

    this.staffForm = new FormGroup({
      "staffName": new FormControl({ value: this.currStaffName, disabled: false }),
      "staffType": new FormControl({ value: this.currStaffType, disabled: false }),
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  confirmDelete() {
    var staffToEdit = this.db.list('/staff/' + this.staffForm.value.staffType)
    staffToEdit.remove(this.key).then(() => {
      this.viewCtrl.dismiss()
    });
  }

  confirmEdit() {
    var staffToEdit = this.db.list('/staff/' + this.staffForm.value.staffType)
    staffToEdit.update(this.key, {
      name: this.staffForm.value.staffName,
    }).then(()=>{
      this.viewCtrl.dismiss()
    });
  }
}
