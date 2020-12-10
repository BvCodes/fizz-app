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

  constructor( private fizzyService: FizzyService) { }

  ngOnInit(): void {
    this.getFizzies();
    
}


  getFizzies(): void {
   this.fizzyService.getFizzies()
    .subscribe(fizzies => this.fizzies = fizzies);
   
  }


  

  


}
