import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fizzy } from './fizzy';
import {  AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class FizzyService {

  fizzies: Observable<Fizzy[]>;

  orderedFizzy: Observable<Fizzy[]>;



  fizzy: Fizzy;


  
  

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    
    ) { 
    this.fizzies = firestore.collection<Fizzy>('fizzies').valueChanges();
   
  }

  

  getFizzies(): Observable<Fizzy[]> {
    return this.fizzies
  }

  getFizzy(id: string): Observable<Fizzy> {
    return this.getFizzies().pipe(
      map(fizz => fizz.find(fizzy => fizzy.fizzyId === id))
    );
  }

  getTopFizzies(): Observable<Fizzy[]> {
     const top5ref = this.firestore.collection<Fizzy>('fizzies', ref => ref.orderBy('avgRating', 'desc').limit(6)).valueChanges(); 
     return top5ref;
  }

}
