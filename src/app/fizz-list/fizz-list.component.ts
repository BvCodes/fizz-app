import { Component, OnInit } from '@angular/core';

import { Fizzy } from '../fizzy';
import { FizzyService } from '../fizzy.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-fizz-list',
  templateUrl: './fizz-list.component.html',
  styleUrls: ['./fizz-list.component.scss']
})
export class FizzListComponent implements OnInit {

  fizzies: Fizzy[];
  displayedColumns: String[] = ['Details', 'Brand', 'Flavor', 'Avg Rating']

  bubImg: string;

  constructor( private fizzyService: FizzyService) { }

  ngOnInit(): void {
    //this.fizzies = this.fizzyService.getFizzies();
    this.getFizzies();
    
}


  getFizzies(): void {
   this.fizzyService.getFizzies()
    .subscribe(fizzies => this.fizzies = fizzies);
   
  }

  /* sortCollection(): Observable<Fizzy> {
    return this.fizzies.pipe(tap(results => results.sort()))
  };
  */

  

  


}
