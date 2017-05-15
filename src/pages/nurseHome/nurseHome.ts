import {Component} from '@angular/core';
import { NurseViewUpdates } from '../nurse-view-updates/nurse-view-updates';
import { NurseSendUpdate } from '../nurse-send-update/nurse-send-update';

@Component({
  templateUrl: 'NurseHome.html'
})
export class NurseHome {
    sendUpdate: any;
    viewUpdates: any;
  constructor() {
    this.sendUpdate = NurseSendUpdate;
    this.viewUpdates = NurseViewUpdates ;
  }
}
