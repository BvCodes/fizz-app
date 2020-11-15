import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FizzListComponent } from './fizz-list/fizz-list.component';
import { FizzDetailComponent } from './fizz-detail/fizz-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BubbleRatingComponent } from './bubble-rating/bubble-rating.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { FizzyRatingComponent } from './fizzy-rating/fizzy-rating.component';
import { EditRatingComponent } from './edit-rating/edit-rating.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'fizzList', component: FizzListComponent},
  { path: 'detail/:fizzyId', component: FizzDetailComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bubbleRating', component: BubbleRatingComponent },
  { path: 'userRating', component: UserRatingComponent },
  { path: 'fizzyRating', component: FizzyRatingComponent },
  { path: 'editRating', component: EditRatingComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
