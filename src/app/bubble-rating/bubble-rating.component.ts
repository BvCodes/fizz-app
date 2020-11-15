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
  //avgRating: Observable<any>;
  bubbleFormValues;

  user: User;

  ratingsTocheck: Bubbles[];

  ratingCheck;

  confirmationMessage;

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

    

    
/*
    this.ratings = this.ratingService.getFizzyRating(this.fizzyId)

    this.avgRating = this.ratings.pipe(
      map(arr => {
        const rate = arr.map(v => v.value)
        return rate.length ? rate.reduce((total, val) => total + val) / arr.length: 'not yet rated'
      })
    )
    */
  }

  //description: string, fizzyId: string, uid: string, value: number, displayName: string, brand: string, flavor

  bubbleHandler(uid, displayName, value, description, photoURL) {
    //this.auth.user$.subscribe(res => this.user = res)

    /*
    this.checkRatingsForUserEntry();


    if (this.ratingCheck != null) {
      
      var button = <HTMLInputElement>document.getElementById("submitButton");
      button.disabled = true;
      document.getElementById("ratingAlert").innerHTML = "You have already review this fizzy, please edit in User Profile."
    } else {
      //const numVotes: number = 0;
      this.updateRatingNumbers();
      this.ratingService.setUserRating(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0)
  }
  */
    this.updateRatingNumbers();
    this.ratingService.setUserRating2(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0)

  }

  newRatingHandler2(uid, displayName, value, description, photoURL) {
    
    this.ratingService.checkForRating2(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0, this.numberOfRatings, this.totalRating)
    
    /*
   if (this.ratingService.checkForRating2(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0) === true ) {
     console.log("it fell in");
     this.updateRatingNumbers();
     this.confirmationMessage = "rating submitted";
    } else {
      this.confirmationMessage = "already exists";
      console.log("it fell out");
    }
  }
  */
}


newRatingHandler3(uid, displayName, value, description, photoURL) {
    
  this.ratingService.checkForRating3(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0, this.numberOfRatings, this.totalRating)
  
  /*
 if (this.ratingService.checkForRating2(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0) === true ) {
   console.log("it fell in");
   this.updateRatingNumbers();
   this.confirmationMessage = "rating submitted";
  } else {
    this.confirmationMessage = "already exists";
    console.log("it fell out");
  }
}
*/
}

  newRatingHandler(uid, displayName, value, description, photoURL) {
    console.log("the click worked")
    if (this.ratingService.checkForRating(uid, this.fizzyId) === 1) {
      this.updateRatingNumbers();
      this.ratingService.setUserRating3(description, this.fizzyId, uid, value, displayName, this.brand, this.flavor, photoURL, 0);
      this.confirmationMessage = "rating submitted"
      console.log(this.confirmationMessage)
    } 
      //else if (this.ratingService.checkForRating(uid, this.fizzyId) === 0) {
      //this.confirmationMessage = "rating already exists, please edit in user profile"
      //console.log(this.confirmationMessage)
      
    //}
    
  }

  updateRatingNumbers() {
    const totalRating = this.totalRating;
    const numberOfRating = this.numberOfRatings;
    var newAvgRating;
    var newTotalRating;
    var newNumberOfRating;

    newTotalRating = this.bubbleForm.value.value + totalRating;
    newNumberOfRating = numberOfRating + 1;
    newAvgRating = newTotalRating / newNumberOfRating;
    

    this.ratingService.updateAvgRating(Math.round(newAvgRating), newNumberOfRating, newTotalRating, this.fizzyId);
    
    
  }


  checkRatingsForUserEntry() {
    
    this.ratingService.getUserRatingCollection(this.user.uid, this.fizzyId).subscribe(
      res => this.ratingCheck = res);
    
}

  testSet(description, value, uid) {
    this.ratingService.setTestRating(description, value, uid)
  }

  testTest(description, value, uid) {
    this.ratingService.setTestTest(description, value, uid)
  }
  
}
