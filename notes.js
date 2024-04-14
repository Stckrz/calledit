// server:
// -models
// --user
// --prediction
// --comment
// -routes
// --user CRUD
// --prediction CRUD
// --comment CRUD


// client;
// -pages;
// --Home
// --Feed?
// --Login
// --Register
// --User Page;
// ---shows users predictions/score/rank etc;
//
// --predictions need to send a notification to the creator to update, once they are completed. Need to add a tab or page for the creator
// --to be able to update the status to whether or not the prediction was correct or not, and then allocate points accordingly.
//
// User model
// XX--username, password stuff, email, score, predictions
// --Should add predictions guessed correctly, rank, predictions voted on correctly, etc..

// Prediction Model
// XX--title, description, created date, prediction date, upvotes, downvotes, 
// comments
// XX--added 'completed' field, still needs to have a field where it's been 'user confirmed', and also a ummm category
//
// Common Components:
// XX--Add a dropdown component that takes props: an array of options, as well as a callback setstate function.


//sooo i want one component to be a feed of predictions.. no matter how they are rendered. so far, we have
//--all predictions - home page - this needs to be sortable by category..
//--user profile predictions - ones created by the user AND ones which the user has voted on
//--user dashboard predictions - ones that the user needs to confirm, and past predictions that the user has made
//
	
})
