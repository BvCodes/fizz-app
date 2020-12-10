import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../rating.service';
import { Observable } from 'rxjs';
import { Bubbles } from '../bubbles';

import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-bubble-rating',
  templateUrl: './bubble-rating.component.html',
  styleUrls: ['./bubble-rating.component.scss']
})
export class BubbleRatingComponent implements OnInit {

  bubbleForm: FormGroup;

 
  @Input() fizzyId;
 
  @Input() brand;
  @Input() flavor;

  @Input() avgRating;
  @Input() numberOfRatings;
  @Input() totalRating;


  ratings: Observable<any>;
 
  bubbleFormValues;

  user: User;





  constructor(private ratingService: RatingService,
              public auth: AuthService, 
              private formBuilder: FormBuilder,         
  ) { 
    
  }

  ngOnInit(): void {

    this.auth.getUser().subscribe(res => this.user = res);

    this.bubbleForm = this.formBuilder.group({
      value: ['', Validators.required],
      description: ['', Validators.maxLength(100)],
      
    
    })

    this.bubbleForm.valueChanges.subscribe(res => this.bubbleFormValues = res);

  }


  newRatingHandler3(uid, displayName, value, description, photoURL) {
      
    this.ratingService.checkForRating3(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0, this.numberOfRatings, this.totalRating)
    
    
  }

 
  
}
