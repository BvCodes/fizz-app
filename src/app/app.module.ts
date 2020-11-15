import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FizzListComponent } from './fizz-list/fizz-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FizzDetailComponent } from './fizz-detail/fizz-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BubbleRatingComponent } from './bubble-rating/bubble-rating.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { FizzyRatingComponent } from './fizzy-rating/fizzy-rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRatingComponent } from './edit-rating/edit-rating.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AboutComponent } from './about/about.component';
import { ScrollableDirective } from './scrollable.directive';


@NgModule({
  declarations: [
    AppComponent,
    FizzListComponent,
    FizzDetailComponent,
    DashboardComponent,
    UserProfileComponent,
    BubbleRatingComponent,
    UserRatingComponent,
    FizzyRatingComponent,
    EditRatingComponent,
    AboutComponent,
    ScrollableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
