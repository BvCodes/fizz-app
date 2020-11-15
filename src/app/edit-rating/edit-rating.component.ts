import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../rating.service';
import { Observable } from 'rxjs';
import { Bubbles } from '../bubbles';

import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { Validators } from '@angular/forms';
import { FizzyService } from '../fizzy.service';
import { Fizzy } from '../fizzy';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.scss']
})
export class EditRatingComponent implements OnInit {

  editForm;

  @Input() brand;
  @Input() flavor;
  @Input() displayName;
  @Input() fizzyId;
  @Input() uid;
  @Input() value;
  @Input() photoURL;
  @Input() numVotes;
  
  resetVotes = 0;
  
  fizzy: Fizzy;
  
  editFormValues;

  constructor(public auth: AuthService,
              private formBuilder: FormBuilder,
              private ratingService: RatingService,
              private fizzyService: FizzyService,
  ) { }

  ngOnInit(): void {

    this.fizzyService.getFizzy(this.fizzyId).subscribe(res => this.fizzy = res)

    this.editForm = this.formBuilder.group({
      value: ['', Validators.required],
      description: [''],
    
    })

    this.editForm.valueChanges.subscribe(res => this.editFormValues = res);
  }

  editHandler(value, description) {

    this.editRatingNumbers();
    this.ratingService.setUserRating(description, this.fizzyId, this.uid, value, this.displayName, this.brand, this.flavor, this.photoURL, this.resetVotes);
    //document.getElementById("editRating").style.display = "none";
  }

  editRatingNumbers() {
    

    const oldValue = this.value;
    const oldTotalRating = this.fizzy.totalRating;
    const numberOfRating = this.fizzy.numberOfRatings;
    var newAvgRating;
    var newTotalRating;
    

    newTotalRating = this.editForm.value.value + oldTotalRating - oldValue;
    newAvgRating = newTotalRating / numberOfRating;
    

    this.ratingService.editAvgRating(Math.round(newAvgRating), newTotalRating, this.fizzyId);
      
    
  }

}
