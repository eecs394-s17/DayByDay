import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { staffAdd } from './staff-add';

@NgModule({
  declarations: [
    staffAdd,
  ],
  imports: [
    IonicPageModule.forChild(staffAdd),
  ],
  exports: [
    staffAdd
  ]
})
export class staffAddModule {}
