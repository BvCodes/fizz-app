import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../rating.service';
import { Observable } from 'rxjs';
import { Bubbles } from '../bubbles';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {

  checked = false;

  panelOpenState = false;
  

  @Input() uid; 

  userBubbles; //Bubbles[];

  editRating = new FormControl();

  constructor(private ratingService: RatingService) { }



  ngOnInit(): void {


    

    this.ratingService.getUserRating(this.uid).subscribe(res => this.userBubbles = res); 

  }

  getUserBubbles(uid): void {
    this.ratingService.getUserRating(uid)
    .subscribe()
  }

  toggleEdit() {
    if (document.getElementById("editRating").style.display = "none") {
      document.getElementById("editRating").style.display = "block";
    } else {
      document.getElementById("editRating").style.display = "none";
    }
  }

  

  /*
  getFizzies(): void {
    this.fizzyService.getFizzies()
     .subscribe(fizzies => this.fizzies = fizzies);
    
   }
*/
}
