import {Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommonProcedures } from '../hospitalInfo/commonProcedures/commonProcedures';
import { Dining } from '../hospitalInfo/dining/dining';
import { GuestPolicies } from '../hospitalInfo/guestPolicies/guestPolicies';

@Component({
  templateUrl: 'hospitalInfo.html'
})
export class HospitalInfo {
	commonProcedures = CommonProcedures;
	dining = Dining
	guestPolicies = GuestPolicies

  constructor(public navCtrl: NavController) {
    
  }
  openPage(page) {
  	this.navCtrl.push(page);
  }
}


