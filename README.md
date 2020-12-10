# FizzyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

<<<<<<< Updated upstream
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
=======
## Overview
https://seltzerly.com
FizzyApp (Seltzerly) is a single-page web app created with Angular 9 and Google Firebase using the angularFire API.
The app allows users to browse, comment and rate various brand/flavors of seltzers. 
>>>>>>> Stashed changes

## Code scaffolding

<<<<<<< Updated upstream
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
=======
- Dashboard: The home page for Seltzerly. It includes the top 6 user-rated Seltzers. These cards link to those seltzers details page.

- FizzList: This is the list of seltzers loaded from the database. This component utilizes the Angular ngFor directive to loop over each 
			record in the database.
			
- FizzDetails: This is the specific page for each individual seltzer. The component also contains bubble-rating and fizzy-rating components.
				Uses the route.snapshot.paramMap methods to get the fizzyId of the route from the fizzList. Then ngIf is used to load that particular
				seltzer's data.

		-Bubble-rating: This component contains the form that allows users to input their ratings/comments. 
		
		-Fizzy-rating: Shows the top 10 upvoted ratings for that seltzer. 
	
- About: Simple about page.

- User-profile: This component allows users to log in/out using Google Auth sign-in. Using ngIf directive, if user is signed in, they can see 
				all of their comments and edit them. 
				
		-User-rating: This is the list of all rating/comments a user has submitted. It also hosts the edit-rating component. 
				
				Edit-rating: Form that allows users to input their edited rating and submit. It does so while accurately changing the avg rating of the seltzer. 
				
>>>>>>> Stashed changes

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

<<<<<<< Updated upstream
## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
=======
- Auth.service : - googleSignin() - creates the async auth state and sends a pop-up that allows users to sign in with Google Auth sign-in.

				- updateUserData() - This function updates userData if neccessary and merges it with existing entries. Returned from googleSignin().
				
				
- fizzy.service : 	- getFizzies() - returns observable collection of fizzys from db.

					- getFizzy(id:string) - returns single fizzy where id === fizzyId.
					
					- getTopFizzies() - returns observable collection of fizzys by avgRating decending limited to 6 records. 
					
- rating.service : 	- getUserRating(userId) - returns observable collection of all ratings created by signed in user.

					- getUserRatingCollection(userId, fizzyId) - returns observable collection of a particular user's ratings for a particular seltzer.
					
					- getFizzyRating2(fizzyId) - Returns observable collections of top 10 ratings for particular fizzy with most upVotes.
					
					- queryFizzRatings(fizzyId) - Returns all ratings of a particular fizzy as an observable collection.
					
					- setUserRating(...) - Sets the data {merge: true} for the an edited user rating.
					
					- checkForRating3(...) - Checks existing ratings to see if a particular userId already has a rating for a particular fizzyId using docSnapshot.
											If a rating already exists, the user is told they must edit their existing rating. This keeps people form submitting multiple
											ratings for the same seltzer. If they do not already have a rating, it sets the rating data and then updates the avg rating
											for that setlzer. 
											
					- setUpVote2(...) - Sets upVote into database. ^^I'll address this here. There is redundancy in the upVote part of the database. Cloud Firestore is a	
										nonSQL database. It does not support compound queries. So basically, in order to be able to order rating queries by upvote and also
										check to see if a an upVote exists on a certain rating, I had to make upVotes their own collection, and a sub collection of the rating 
										itself. This is not an ideal solution, and would not need to be done using an SQL db, but for right now, it was the solution that I was able
										to implement. I am searching out betters ways to query/structure this and will update once that solution is found.^^
										
					- checkForUpVotes(...) - Checks to see if an upvote exists for a certain user and returns an observable.
					
					- updateAvgRating(...) - Updates the rating data on the specified fizzy.
					
					- editAvgRating(...) - Edits the avg ratings when a user edits one of their ratings. 
					
					
			
					
>>>>>>> Stashed changes

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
