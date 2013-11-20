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

// "p" as in previous guess
var p = [];                                
function showGuesses(guess) {
    p.unshift(guess); 
}

var count = p.length;
var previousGuess = p[1];


function checkAnswer(guess) {
    console.log(guess);
    var count = p.length;
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
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>Please enter a number between 1 and 100!</h2>");
    } else if (isNaN(guess)) {
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>Please enter a number!</h2>");
    } else if (count == 0) { 
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>Try again!</h2>");
    
/* John, why doesn't this work - with the comparisons and && - something about syntax???

    else if (guess < p[-1])&&(p[-1] < target) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>"); 
    } else if (target < p[-1])&&(p[-1] < guess) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>");
    } else if (p[-1] < guess)&&(guess < target) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
    } else if (target < guess)&&(guess < p[-1]) {
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
    }

// wimped out and did what Mike Doyle did.  Could also expand first quess above to say high or low;
 however, haven't yet.
*/


    } else if (Math.abs(guess - target) < Math.abs(previousGuess - target)) {
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting <span>HOTTER!</span></h2>");
    } else {
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting <span>COLDER!</span></h2>");    
    }

}        

function restart() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
        }
    var target = getRandomInt(1, 100);
    console.log(target);
    $(".messageBox").hide();
    $(".displayOfGuess").hide();
    $(".banner ").hide();
    $(".safe_open").hide();
    $(".safe_closed").fadeIn('fast');
    $(".gc2, .gurl").hide();
    $("#inputBox").val("");
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
        var toAdd = $("#inputBox").val();
       $(".displayOfGuess").append("<p>" + p + "</p>");
        event.preventDefault();
    });

    // Start over
    $("#startOver").keydown(function (event) {
        if (event.which == 13) 
        restart();
    });

    $("#startOver").click(function (event){
        restart();
    });





});