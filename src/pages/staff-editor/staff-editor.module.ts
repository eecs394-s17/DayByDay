import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { staffEditor } from './staff-editor';

@NgModule({
  declarations: [
    staffEditor,
  ],
  imports: [
    IonicPageModule.forChild(staffEditor),
  ],
  exports: [
    staffEditor
  ]
})
export class staffEditorModule {}
