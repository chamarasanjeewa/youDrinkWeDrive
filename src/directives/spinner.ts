'use strict';

import {Component, Input} from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <ion-content class="panel-spinner" [hidden]="isHidden">
      <div [ngClass]="isBackground ? 'spinner-bg' : 'spinner-no-bg'"></div>
      <ion-spinner name="bubbles"></ion-spinner>
    </ion-content>
  `
})
export class SpinnerComponent {
  private isHidden: boolean = true;
  private isBackground: boolean = true;

  @Input()
  public set isRunning(value: any) {
    if (typeof (value) === 'object') {
      this.isHidden = value.isHidden;
      this.isBackground = value.isBackground;
    }
    else {
      this.isHidden = value;
      this.isBackground = true;
    }
  }
}