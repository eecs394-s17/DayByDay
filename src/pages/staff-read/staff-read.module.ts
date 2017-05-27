import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { staffRead } from './staff-read';

@NgModule({
  declarations: [
    staffRead,
  ],
  imports: [
    IonicPageModule.forChild(staffRead),
  ],
  exports: [
    staffRead
  ]
})
export class staffdReadModule {}
