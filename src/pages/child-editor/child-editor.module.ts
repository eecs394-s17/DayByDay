import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildEditor } from './child-editor';

@NgModule({
  declarations: [
    ChildEditor,
  ],
  imports: [
    IonicPageModule.forChild(ChildEditor),
  ],
  exports: [
    ChildEditor
  ]
})
export class ChildEditorModule {}
