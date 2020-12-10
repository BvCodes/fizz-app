import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Bubbles } from './bubbles';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Fizzy } from './fizzy';


@Injectable({
  providedIn: 'root'
})
export class RatingService {

  bubbles: Observable<any[]>;

  

  constructor(private firestore: AngularFirestore,
              private auth: AuthService,
              private firestoreDB: AngularFireDatabase,
              private _snackBar: MatSnackBar,
  ) 
  { 
  
  }

  // returns obsevable collection of Bubbles or Ratings that a single user has submitted

  getUserRating(userId): Observable<Bubbles[]> {
    const bubbleRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('uid', '==', userId));
    return bubbleRef.valueChanges();
    
  }
  

  // returns observable doc of a particular users rating for a particular seltzer

  getUserRatingCollection(userId, fizzyId) {
    var userRef = this.firestore.collection('bubbles').doc(`${userId}_${fizzyId}`);
    return userRef.valueChanges();
  }



  getFizzyRating(fizzyId): Observable<Bubbles[]> {
    const fizzyRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('fizzyId', '==', fizzyId).limit(10));
    return fizzyRef.valueChanges();
    
  }

  // returns an observalbe collections of the ratings for a seltzer ordered by number of Upvotes descending. It is limited to 10 ratings

  getFizzyRating2(fizzyId): Observable<Bubbles[]> {
    const fizzyRef = this.firestore.collection('fizzies').doc(`${fizzyId}`).collection<Bubbles>('rating', ref => ref.orderBy("numVotes", "desc").limit(10)); 
    return fizzyRef.valueChanges();
    
  }

  // returns a collection of ratings for a particular seltzer

  queryFizzRatings(fizzyId) {
    const bubbleRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('fizzyId', '==', fizzyId));
    return bubbleRef;
  }
  
  

  

  setUserRating(description: string, fizzyId: string, uid: string, value: number, displayName: string, brand: string, flavor, photoURL: string, numVotes: number) {
    const rating = { description, fizzyId, uid, value, displayName, brand, flavor, photoURL, numVotes };
    const bubblePath = `bubbles/${uid}_${fizzyId}`;
    const ratingPath = `fizzies/${fizzyId}/rating/${uid}`
    this.firestore.doc(ratingPath).set(rating, {merge: true});
    this.firestore.doc(bubblePath).set(rating, {merge: true});
    this._snackBar.open("your rating was successfully edited", "close", {duration: 5000,});

  }

 

  // working function that checks to see if a user has already submitted a rating for a seltzer
  // if they have not, it sets the data into the database
  // if they have already rated it, it tells them that they have already rated.
  // they can then edit that rating in their user profile instead.

  checkForRating3(description: string, 
                  fizzyId: string, 
                  uid: string, 
                  value: number, 
                  displayName: string, 
                  brand: string, 
                  flavor:string, 
                  photoURL: string, 
                  numVotes: number,
                  numberOfRatings: number,
                  totalRating: number,
                  ) {
    const bubblePath = `bubbles/${uid}_${fizzyId}`
    const ratingPath = `fizzies/${fizzyId}/rating/${uid}`;
    const rating = { description, fizzyId, uid, value, displayName, brand, flavor, photoURL, numVotes };
    
    const newTotalRating = totalRating + value;
    const newNumberOfRatings = numberOfRatings + 1;
    const newAvgRating = newTotalRating / newNumberOfRatings;
    this.firestore.firestore.doc(ratingPath).get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          this.firestore.doc(ratingPath).set(rating);
          this.firestore.doc(bubblePath).set(rating);
          this.updateAvgRating(Math.round(newAvgRating), newNumberOfRatings, newTotalRating, fizzyId);
          
          //window.alert("your rating was succesfully submitted")
          this._snackBar.open("your rating was successfully submitted", "close", {duration: 5000,});
        } else {
          
          //window.alert("you've already rated this seltzer, please edit your rating in your user profile")
          this._snackBar.open("you've already reated this seltzer, please edit your rating in your user profile", "close", {duration: 5000,})
        }
        
      });
  }



// sets the upvote and calculates the total upvotes for a rating

setUpVote2(uid: string, fizzyId: string, upVote: boolean, votes: number) {
  
  const vote = { upVote };
  var numVotes = votes + 1;
  const numVotesAdd = { numVotes }
  const ratingPath = `fizzies/${fizzyId}/rating/${uid}`;
  const upVotePath = `fizzies/${fizzyId}/rating/${uid}/upVote/${uid}`;

  this.firestore.doc(upVotePath).get().toPromise()
    .then(docSnapShot => {
      if (!docSnapShot.exists) {
        this.firestore.doc(upVotePath).set(vote);
        this.firestore.doc(ratingPath).set(numVotesAdd, {merge: true});
        console.log("your up vote was counted");
        this._snackBar.open("your upvote was counted", "close", {duration: 5000,});
      } 
      else 
      {
        console.log("already up voted, can't do it twice");
        this._snackBar.open("already up voted, can't do it twice", "close", {duration: 5000,});
      }
    })
 
}



  // checks to see if a user has upvoted a rating already

  checkForUpVote2(uid: string, fizzyId: string)  {
    const upVoteRef = this.firestore.doc(`fizzies/${fizzyId}/rating/${uid}/upVote/${uid}`);
    return upVoteRef.valueChanges();
  }

  // updates the avg rating of a seltzer

  updateAvgRating(avgRating: number, numberOfRatings: number, totalRating: number, fizzyId: string) {
    const updateRating = { avgRating, numberOfRatings, totalRating };
    this.firestore.collection("fizzies").doc(fizzyId).set(updateRating, {merge: true});
  }

  // edits the average rating of a seltzer
  
  editAvgRating(avgRating: number, totalRating: number, fizzyId: string) {
    const editRating = { avgRating, totalRating };
    this.firestore.collection("fizzies").doc(fizzyId).update(editRating)
    ;
  }

 


}
