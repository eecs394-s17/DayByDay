import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildManagement } from './child-management';

@NgModule({
  declarations: [
    ChildManagement,
  ],
  imports: [
    IonicPageModule.forChild(ChildManagement),
  ],
  exports: [
    ChildManagement
  ]
})
export class ChildManagementModule {}
