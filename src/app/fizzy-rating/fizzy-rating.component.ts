import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../rating.service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { Bubbles } from '../bubbles';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-fizzy-rating',
  templateUrl: './fizzy-rating.component.html',
  styleUrls: ['./fizzy-rating.component.scss']
})
export class FizzyRatingComponent implements OnInit {

  @Input() fizzyId; 

  fizzyRating: Bubbles[];

  
  user;

  constructor(private ratingService: RatingService,
              public auth: AuthService,
              ) { }

  ngOnInit(): void {
    this.ratingService.getFizzyRating2(this.fizzyId).subscribe(res => this.fizzyRating = res);
    
  }


  upVote(uid, fizzyId, upVote, votes) {
    var upVoteCheck;
    this.ratingService.checkForUpVote2(uid, fizzyId).subscribe(res => upVoteCheck = res);
    if (upVoteCheck == undefined) {
    this.ratingService.setUpVote2(uid, fizzyId, upVote, votes);
    }
  }

 

}
