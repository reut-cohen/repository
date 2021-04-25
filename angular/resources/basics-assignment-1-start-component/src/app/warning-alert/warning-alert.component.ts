import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  // templateUrl: 'warning-alert.component.html',
  template: `
    <button type="button" class="btn btn-warning warning" (click)="onClickAlert('warning')">Warning</button>
    <p>This is a warning, you are in danger</p>
  `,
  styles: [
    `
      p {
        padding: 20px;
        border: 1px solid red;
        background-color: mistyrose;
      }

      .warning {
        color: red
      }
    `
  ]
})

export class WarningAlertComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  onClickAlert(str: string) {
    alert(str);
  }
}
