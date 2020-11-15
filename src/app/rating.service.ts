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

  getUserRating(userId): Observable<Bubbles[]> {
    const bubbleRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('uid', '==', userId));
    return bubbleRef.valueChanges();
    
  }
  

  

  getUserRatingCollection(userId, fizzyId) {
    var userRef = this.firestore.collection('bubbles').doc(`${userId}_${fizzyId}`);
    return userRef.valueChanges();
  }


  getFizzyRating(fizzyId): Observable<Bubbles[]> {
    const fizzyRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('fizzyId', '==', fizzyId).limit(10));
    return fizzyRef.valueChanges();
    
  }

  // new data structure, top 10 upvotes 

  getFizzyRating2(fizzyId): Observable<Bubbles[]> {
    const fizzyRef = this.firestore.collection('fizzies').doc(`${fizzyId}`).collection<Bubbles>('rating', ref => ref.orderBy("numVotes", "desc").limit(10)); 
    return fizzyRef.valueChanges();
    
  }

  queryFizzRatings(fizzyId) {
    const bubbleRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('fizzyId', '==', fizzyId));
    return bubbleRef;
  }
  
  /*
  getFirstFiveRatings(fizzyId) {
    const votes = 'numVotes'
    const pageSize = 5;
    //const bubbleRef = this.firestore.collection<Bubbles>('bubbles', ref => ref.where('fizzyId', '==', fizzyId).orderBy(votes).limit(pageSize));
    const bubbleRef = this.queryFizzRatings(fizzyId);
  
    return bubbleRef.ref.orderBy(votes).limit(pageSize);
    
  }

  nextFiveRatings(last, fizzyId) {
    const votes = 'numVotes'
    const pageSize = 5;
   var ratings = this.getFirstFiveRatings(fizzyId);
   return ratings.ref.orderBy(votes).startAfter(last[votes].limit(pageSize))
  }

  prevFiveRatings(prev, fizyId) {

  }
*/

  

  setUserRating(description: string, fizzyId: string, uid: string, value: number, displayName: string, brand: string, flavor, photoURL: string, numVotes: number) {
    const rating = { description, fizzyId, uid, value, displayName, brand, flavor, photoURL, numVotes };
    const bubblePath = `bubbles/${uid}_${fizzyId}`;
    const ratingPath = `fizzies/${fizzyId}/rating/${uid}`
    this.firestore.doc(ratingPath).set(rating, {merge: true});
    this.firestore.doc(bubblePath).set(rating, {merge: true});
    this._snackBar.open("your rating was successfully edited", "close", {duration: 5000,});

  }

  // trying to separate the check from the set function. If check turn out true, then nothing should happen, 
  // if the check is false, then the set function should run. Hoping this keeps from the numbers updating
  // when they shouldn't 


  // bring the update avg ratigng function over to this service and turn the variables into parameters on the
  // function

  checkForRating(uid:string, fizzyId:string) {
    const ratingPath = `bubbles/${uid}_${fizzyId}`;
    var result;
    this.firestore.doc(ratingPath).get().toPromise()
      .then(docSnapShot => {
        if (docSnapShot.exists) {
          console.log(docSnapShot)
          result = 1;
          console.log(result);
        } 
      })
    return result
  }
  /*
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
  */
  // this is the correct logic for this problem. This is the function that works.
  checkForRating2(description: string, 
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
    const ratingPath = `bubbles/${uid}_${fizzyId}`;
    const rating = { description, fizzyId, uid, value, displayName, brand, flavor, photoURL, numVotes };
    
    const newTotalRating = totalRating + value;
    const newNumberOfRatings = numberOfRatings + 1;
    const newAvgRating = newTotalRating / newNumberOfRatings;
    this.firestore.firestore.doc(ratingPath).get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          this.firestore.doc(ratingPath).set(rating);
          
          this.updateAvgRating(Math.round(newAvgRating), newNumberOfRatings, newTotalRating, fizzyId);
          console.log("sent the doc, from the service")
          window.alert("your rating was succesfully submitted")
        } else {
          console.log("didn't send, from the service")
          window.alert("you've already rated this seltzer, please edit your rating in your user profile")
        }
        
      });
  }

  // trying to redo checkForRating2 to set up new data structure. This should allow for better querying based on upvotes
  // will have to change upVote pathing as well

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
          console.log("sent the doc, from the service")
          //window.alert("your rating was succesfully submitted")
          this._snackBar.open("your rating was successfully submitted", "close", {duration: 5000,});
        } else {
          console.log("didn't send, from the service")
          //window.alert("you've already rated this seltzer, please edit your rating in your user profile")
          this._snackBar.open("you've already reated this seltzer, please edit your rating in your user profile", "close", {duration: 5000,})
        }
        
      });
  }

  setUserRating3(description: string, fizzyId: string, uid: string, value: number, displayName: string, brand: string, flavor, photoURL: string, numVotes: number) {
    const rating = { description, fizzyId, uid, value, displayName, brand, flavor, photoURL, numVotes };
    const ratingPath = `bubbles/${uid}_${fizzyId}`; 
    this.firestore.doc(ratingPath).set(rating);
  }


  setUserRating2(description: string, fizzyId: string, uid: string, value: number, displayName: string, brand: string, flavor, photoURL: string, numVotes: number) {
    const rating = { description, fizzyId, uid, value, displayName, brand, flavor, photoURL, numVotes };
    const ratingPath = `bubbles/${uid}_${fizzyId}`;
    this.firestore.doc(ratingPath).get().toPromise()
      .then(docSnapShot => {
        if (!docSnapShot.exists) {
          this.firestore.doc(ratingPath).set(rating);
          
          
          console.log("your review was submitted")
          } 
        else 
        {
          console.log("can only submit one rating per fizz, please edit in your user profile")
        }
      })
  }

  setUpVote(uid: string, fizzyId: string, upVote: boolean, votes: number) {
    /*
    const vote = { upVote }
    //const upVoteRef = this.firestore.doc(`bubbles/${uid}_${fizzyId}/upVote/${uid}`);
    var numVotes = votes + 1;
    const numVotesAdd = { numVotes }
    const ratingPath = `bubbles/${uid}_${fizzyId}`;
    const upVotePath = `bubbles/${uid}_${fizzyId}/upVote/${uid}`;

    //if (upVoteRef == null) {
    this.firestore.doc(ratingPath).set(numVotesAdd, {merge: true});
      
      //} 
    this.firestore.doc(upVotePath).set(vote);
    */
    const vote = { upVote };
    var numVotes = votes + 1;
    const numVotesAdd = { numVotes }
    const ratingPath = `bubbles/${uid}_${fizzyId}`;
    const upVotePath = `bubbles/${uid}_${fizzyId}/upVote/${uid}`;

    this.firestore.doc(upVotePath).get().toPromise()
      .then(docSnapShot => {
        if (!docSnapShot.exists) {
          this.firestore.doc(upVotePath).set(vote);
          this.firestore.doc(ratingPath).set(numVotesAdd, {merge: true});
          console.log("your up vote was counted");
          //window.alert("your upvote was counted");
          this._snackBar.open("your upvote was counted", "close", {duration: 5000,});
        } 
        else 
        {
          console.log("already up voted, can't do it twice");
          //window.alert("you have already upvoted this rating, can only upvote each rating once");
          this._snackBar.open("already up voted, can't do it twice", "close", {duration: 5000,});
        }
      })
   
}


// new rating path 

setUpVote2(uid: string, fizzyId: string, upVote: boolean, votes: number) {
  /*
  const vote = { upVote }
  //const upVoteRef = this.firestore.doc(`bubbles/${uid}_${fizzyId}/upVote/${uid}`);
  var numVotes = votes + 1;
  const numVotesAdd = { numVotes }
  const ratingPath = `bubbles/${uid}_${fizzyId}`;
  const upVotePath = `bubbles/${uid}_${fizzyId}/upVote/${uid}`;

  //if (upVoteRef == null) {
  this.firestore.doc(ratingPath).set(numVotesAdd, {merge: true});
    
    //} 
  this.firestore.doc(upVotePath).set(vote);
  */
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
        //window.alert("your upvote was counted")
        this._snackBar.open("your upvote was counted", "close", {duration: 5000,});
      } 
      else 
      {
        console.log("already up voted, can't do it twice");
        //window.alert("you have already upvoted this rating, can only upvote each rating once")
        this._snackBar.open("already up voted, can't do it twice", "close", {duration: 5000,});
      }
    })
 
}



  checkForUpVote(uid: string, fizzyId: string)  {
    const upVoteRef = this.firestore.doc(`bubbles/${uid}_${fizzyId}/upVote/${uid}`);
    return upVoteRef.valueChanges();
  }

  checkForUpVote2(uid: string, fizzyId: string)  {
    const upVoteRef = this.firestore.doc(`fizzies/${fizzyId}/rating/${uid}/upVote/${uid}`);
    return upVoteRef.valueChanges();
  }

  

  updateAvgRating(avgRating: number, numberOfRatings: number, totalRating: number, fizzyId: string) {
    const updateRating = { avgRating, numberOfRatings, totalRating };
    this.firestore.collection("fizzies").doc(fizzyId).set(updateRating, {merge: true});
  }

  editAvgRating(avgRating: number, totalRating: number, fizzyId: string) {
    const editRating = { avgRating, totalRating };
    this.firestore.collection("fizzies").doc(fizzyId).update(editRating)
    ;
  }

  setTestRating(description: string, value: number, uid: string) {
    const rating = { description, value, uid }
    return this.firestore.collection("bubbles").add(rating);
  }

  setTestTest(description: string, value: number, uid: string) {
    const rating = { description, value, uid }
    return this.firestore.collection("bubbles").doc(uid).set(rating);
  }



}
