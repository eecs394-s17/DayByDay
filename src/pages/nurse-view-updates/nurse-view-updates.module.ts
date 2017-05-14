import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseViewUpdates } from './nurse-view-updates';

@NgModule({
  declarations: [
    NurseViewUpdates,
  ],
  imports: [
    IonicPageModule.forChild(NurseViewUpdates),
  ],
  exports: [
    NurseViewUpdates
  ]
})
export class NurseViewUpdatesModule {}
