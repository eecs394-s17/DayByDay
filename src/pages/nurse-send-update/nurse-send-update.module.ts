import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseSendUpdate } from './nurse-send-update';

@NgModule({
  declarations: [
    NurseSendUpdate,
  ],
  imports: [
    IonicPageModule.forChild(NurseSendUpdate),
  ],
  exports: [
    NurseSendUpdate
  ]
})
export class NurseSendUpdateModule {}
