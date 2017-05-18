import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildRead } from './child-read';

@NgModule({
  declarations: [
    ChildRead,
  ],
  imports: [
    IonicPageModule.forChild(ChildRead),
  ],
  exports: [
    ChildRead
  ]
})
export class ChildReadModule {}
