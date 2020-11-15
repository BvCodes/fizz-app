import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { FizzListComponent } from './fizz-list/fizz-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fizzy-app';
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  events: string[] = [];
  opened: boolean = true;



}
