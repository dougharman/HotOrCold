
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var target = getRandomInt(1,100);

function checkAnswer(guess) {
	console.log(guess);
	if (guess == target) {
		console.log("You win!");
	}
	else if (isNaN(guess)) {
		console.log ("Please enter a number!");
	}
	else {
		console.log("Try again!");
	}
}

//function formReset() {
//	document.getElementByClassId("inputBox").reset()
//}

$(document).ready(function() {

// Save the player's guess when player presses enter 
	$("#inputBox").keydown(function(event) {
  		if ( event.which == 13 ) {
  			checkAnswer($("#inputBox").val());
  			var toAdd = $("#inputBox").val();
  			$("#displayOfGuess").append("<p>" + toAdd + "</p>");
  			$(".bigBox")[0].reset();
//  John, what the correct js / jQuery code for this: $("#inputBox").onkeypress=formReset()
//    It didn't work when I tried it, so I went back to HTML
//	John, why do I get this jQuery error message: event.returnValue is deprecated. Please use the standard event.preventDefault() instead.   	  	
   	  	event.preventDefault();											
   			}
   		});	  	

// Save the player's guess if player clicks on "Submit"
	$( "#submitButton" ).click(function() {			
   		checkAnswer($("#inputBox").val());
   		var toAdd = $("#inputBox").val();
  		$("#displayOfGuess").append("<p>" + toAdd + "</p>");
  		$(".bigBox")[0].reset();  		
	});
});



/*
	numberOfGuesses++;
	var msg = ("Number of guesses" + numberOfGuesses +".");
	$.print(msg, "html");
	$.print(event);

	}
});

*/