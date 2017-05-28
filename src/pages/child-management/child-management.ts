import { Component } from '@angular/core';
import { ChildCRUD } from '../child-crud/child-crud';
import { ChildRead } from '../child-read/child-read';

/**
* Generated class for the ChildManagement page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
  templateUrl: 'child-management.html'
})
export class ChildManagement {
    crud: any;
    read: any;
  constructor() {
    this.crud = ChildCRUD;
    this.read = ChildRead ;
  }
}
