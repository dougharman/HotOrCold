// Create a random varable
// Setting to 100 for testing
var random = 100;
/*
var random = getRandomInt(0, 999) {
  return Math.floor(Math.random() * (999 - 0 + 1) + 0);
}

*/


// Record / save the player's guess
// Setting to 98 for testing

var guess = document.getElementById("#inputBox");

// Why not this?  Which might let me combine it with the .keydown and .click statements.
// Or is this sort of thing the difference between good and bad code?

// var guess = $( "#inputBox" ).keydown(function( event ) {
//				var value = $( this ).val();
//  			})  



// Count the number of tries.
var numberOfGuesses = 0;


// Save the player's guess if player presses "Enter"
$( "#inputBox" ).keydown(function( event ) {
  if ( event.which == 13 ) {
   event.preventDefault();
  }
  alert(document.getElementById("#inputBox").val());
});


// Save the player's guess if player clicks on "Submit"
$( "#submitBox" ).click(function() {			
  $( "#inputBox" ).keydown();
});


// Restarts the count if the player so chooses.  I think this implies that the player's guess
// is the "local" variable and the random variable is the "top-level" variable???
$("#startOver").click(function() {
    $("#inputBox").data("count", 0);

});


$(document).ready(function() {
	for (var guess = 0; guess != random; guess++) {
		if (guess == random) 
			show("You win!");
			break;
		
		if (guess < random) 
			show("Try a larger number!");
		
		if (guess > random) 
			show("Try a lower number");
		
		else 												// Still need a statement for when text is entered
			show("Please enter a number between 0 and 999");

/*															// Copied approach from jQuery API for .keydown
															// Disabled for testing

	numberOfGuesses++;
	var msg = ("Number of guesses" + numberOfGuesses +".");
	$.print(msg, "html");
	$.print(event);
*/	
	}
});