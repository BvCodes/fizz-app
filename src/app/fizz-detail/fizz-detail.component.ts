import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FizzyService } from '../fizzy.service';
import { Observable } from 'rxjs';
import { Fizzy } from '../fizzy';

@Component({
  selector: 'app-fizz-detail',
  templateUrl: './fizz-detail.component.html',
  styleUrls: ['./fizz-detail.component.scss']
})
export class FizzDetailComponent implements OnInit {

  fizzy: Fizzy;

  constructor(
    private route: ActivatedRoute,
    private fizzyService: FizzyService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getFizzy();
  }

 getFizzy(): void {
    const id = this.route.snapshot.paramMap.get('fizzyId');
    this.fizzyService.getFizzy(id)
      .subscribe(fizzy => this.fizzy = fizzy)
    
      
  }

  goBack(): void {
    this.location.back();
  }

  

}
