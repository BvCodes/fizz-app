import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { RatingService } from '../rating.service';
import { User } from '../user';
//import { userInfo } from 'os';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userRatings: Observable<any[]>;
  user: User;
  uid: any;

  user1;
  
  
  

  constructor(public auth: AuthService,
              private ratingService: RatingService,
  ) {
    
   }

  ngOnInit(): void {

  }

  

  getUserRatings() {
    this.userRatings = this.ratingService.getUserRating(this.user.uid);

  }

  

}
