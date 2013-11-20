function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var target = getRandomInt(1, 100);
console.log(target);

//  John, code I found the original showBanner code by Googling for "something" that would sequentially
//  show my messages; however, I couldn't get it to work.  (Original code is in "testCode" file.)
//  so I found the following which does - sorta, i.e., it still happens too fast


var eT = 0;     
function showBanner(guess) {
    if (guess == target) {   
    $(".banner").hide().each(function() {
        $(this).delay(eT).fadeIn('slow');
        eT += 600;
        });
    }
}

var p = [];                                // "p" as in previous guess
function showGuesses(guess) {
    p.unshift(guess); 
}

var count = p.length;
alert(count);


function checkAnswer(guess) {
    console.log(guess);
    alert(count);
    if (guess == target) {
        $(".messageBox p:first").append("<h2>You Win!</h2>");
        $(".messageBox p:nth-child(2)").empty();
        $(".displayOfGuess").hide();
        $(".safe_closed, .safe_open").toggleClass("hide");
        $(".gc2, .gurl").removeClass("hide");
        $(".gurl").attr("align","center");
    
        // John, plugin code for "modern blink"
      
        $(".messageBox p:first").modernBlink({
            duration: 1000,
            iterationCount: "5",
            auto: true
        })

    } else if (guess < 1 || guess > 100) {
        $(".messageBox p:nth-child(2)").append("<h2>Please enter a number between 1 and 100!</h2>");
    } else if (isNaN(guess)) {
        $(".messageBox p:nth-child(2)").append("<h2>Please enter a number!</h2>");
    } else if (count == 1) { 
        $(".messageBox p:nth-child(2)").append("<h2>Try again!</h2>");
    } else if (guess < p[-1])&&(p[-1] < target) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>"); 
    } else if (target < p[-1])&&(p[-1] < guess) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>");
    } else if (p[-1] < guess)&&(guess < target) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
    } else if (target < guess)&&(guess < p[-1]) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
    } else {
        $(".messageBox p:nth-child(2)").append("<h2>Try again!</h2>")
    }       
}        

$(document).ready(function () {

    // Save the player's guess when player presses enter 
    $("#inputBox").keydown(function (event) {
        if (event.which == 13) {
            checkAnswer($("#inputBox").val());
            showBanner($("#inputBox").val());
            showGuesses($("#inputBox").val());
            var toAdd = $("#inputBox").val();
            $(".displayOfGuess").append("<p>" + p + "</p>");
            event.preventDefault();
        }

/*	John, why do I get this jQuery error message: 
        
        event.returnValue is deprecated. Please use the standard event.preventDefault() instead 
        jquery.js:5374 	  	   	  												
    
*/

    });

    // Save the player's guess if player clicks on "Submit
    $("#submitButton").click(function () {
        checkAnswer($("#inputBox").val());
        showBanner($("#inputBox").val());
        showGuesses($("#inputBox").val());
        $(".displayOfGuess").append("<p>" + p + "</p>");
        event.preventDefault();
    });

/* John - What's the proper way to reset a form?

This works; however, I lose the red background:

    $("#inputBox").val(fadeTo('fast', 0));
    $("inputBox").empty();   



This doesn't work:
	function formReset() {
		document.getElementByClassId("inputBox").reset()
	}

Or this:
	$("#inputBox").onkeypress=formReset()

So, I'm doing the following - and forgetting about clearing the input box for the time being.
*/

    // Start over - with work-around.  I couldn't get it to toggle correctly all the time!
    $("#startOver").click(function () {
        $(".displayOfGuess").empty();
        $(".safe_open").hide();
        $(".safe_closed").fadeIn('fast');
        $(".banner ").hide();
        $(".messageBox").hide();
        $(".gc2, .gurl").hide();
    }); 

});