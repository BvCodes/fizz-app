import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, fromEventPattern } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userData: User;

  user1;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
  )
  { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )

    

    
    

    }

    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
      //this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  
  /*    var provider = new auth.GoogleAuthProvider();

      this.afAuth.signInWithPopup(provider).then(function(result) {
        var token = result.credential.providerId;
        var user = result.user;
        this.user1 = user;

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        
      });
      */
      }

  getUser(): Observable<User> {
    return this.user$;
  }
  

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
    }

    return userRef.set(data, { merge: true })
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  

}
