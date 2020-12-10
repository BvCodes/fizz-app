import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { FizzListComponent } from './fizz-list/fizz-list.component';
import { AuthService} from '../app/auth.service';


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

  
  constructor(public auth: AuthService){}



}
