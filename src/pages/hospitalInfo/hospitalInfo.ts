import {Component} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommonProcedures } from '../hospitalInfo/commonProcedures/commonProcedures';
import { Dining } from '../hospitalInfo/dining/dining';
import { GuestPolicies } from '../hospitalInfo/guestPolicies/guestPolicies';
import { ParentSupportSystems } from '../hospitalInfo/parentSupportSystems/parentSupportSystems';
import { TypesOfProviders } from '../hospitalInfo/typesOfProviders/typesOfProviders';

@Component({
  templateUrl: 'hospitalInfo.html'
})
export class HospitalInfo {
	commonProcedures = CommonProcedures;
	dining = Dining
	guestPolicies = GuestPolicies
	parentSupportSystems = ParentSupportSystems
	typesOfProviders = TypesOfProviders;


  constructor(public navCtrl: NavController) {
    
  }
  openPage(page) {
  	this.navCtrl.push(page);
  }
}


