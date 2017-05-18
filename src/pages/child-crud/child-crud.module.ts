import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildCRUD } from './child-crud';

@NgModule({
  declarations: [
    ChildCRUD,
  ],
  imports: [
    IonicPageModule.forChild(ChildCRUD),
  ],
  exports: [
    ChildCRUD
  ]
})
export class ChildCRUDModule {}
