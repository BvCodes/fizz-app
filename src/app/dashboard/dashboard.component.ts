import { Component, OnInit } from '@angular/core';

import { FizzyService } from '../fizzy.service';
import { Observable } from 'rxjs';
import { Fizzy } from '../fizzy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  topFizzies: Fizzy[];

  constructor(private fizzyService: FizzyService) { }

  ngOnInit(): void {
    //this.topFizzies = this.fizzyService.orderedFizzy;
    //this.getFizzies();
    this.getTop5();
  }

  getFizzies(): void {
    this.fizzyService.getTopFizzies()
      .subscribe(topFizzies => this.topFizzies = topFizzies)
  }

  getTop5() {
    this.fizzyService.getTopFizzies()
      .subscribe(ref => this.topFizzies = ref);
  }

}
