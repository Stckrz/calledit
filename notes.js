
/*
Final things to iron out : 
BUGS:
--Check comment generation.. there is a potential situation where a comment could be created, but not update the prediction array with the comment id
--Find a way to send notifications. right now, they are only sent when the user logs in :/
--Find a way to refresh user cookie. right now, it DOES expire, but it does no whether the user is active or not, after 30 mins.
--Fix navbar, so that it is sticky instead of scrolling away.
--user profile dropdown does not show current selection
--Responsive design is broken, and needs a complete overhaul..


FEATURES:
--Add robustness to user profile. implement progress bar for ranking, show more details about user, etc.. Maybe implement user icons for different ranks or something
--Finish working on comments, nesting comments replied to comments recursively, add pagination or 'see more' etc..
--Add a system for scoring based on time remaining, voting odds, etc..
--Redesign of components user interface, especially predictions.


 
 
 server:

 -models
 --user
 --prediction
 --comment

 -routes
 --user CRUD
 --prediction CRUD
 --comment CRUD


 client;
 -pages;
 --Home
 --Feed?
 --Login
 --Register
 --User Page;
 ---shows users predictions/score/rank etc;

XX --predictions need to send a notification to the creator to update, once they are completed. Need to add a tab or page for the creator
XX--to be able to update the status to whether or not the prediction was correct or not, and then allocate points accordingly.

 User model
 XX--username, password stuff, email, score, predictions
 --Should add predictions guessed correctly, rank, predictions voted on correctly, etc..

 Prediction Model
 XX--title, description, created date, prediction date, upvotes, downvotes, 
 comments
 XX--added 'completed' field, still needs to have a field where it's been 'user confirmed', and also a ummm category

 Common Components:
 XX--Add a dropdown component that takes props: an array of options, as well as a callback setstate function.


XXsooo i want one component to be a feed of predictions.. no matter how they are rendered. so far, we have
XX--all predictions - home page - this needs to be sortable by category..
XX--user profile predictions - ones created by the user AND ones which the user has voted on
XX--user dashboard predictions - ones that the user needs to confirm, and past predictions that the user has made
--NICE!

  
 })
 */
