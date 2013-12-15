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


function checkAnswer(guess) {
    console.log(guess);
    var previousGuess = p[0];
    var count = p.length;
    
    if (previousGuess == target) {                                      // This was working; however, after I cleared the array in the restart 
        restart();                                                      // function, it stopped working
    }
    else if (guess == target) {
        $(".messageBox p:first").append("<h2>You Win!</h2>");
        kaching_sound.play();
        $(".messageBox p:nth-child(2)").empty();
        $(".displayOfGuess").hide();
        $(".safe_closed, .safe_open").toggleClass("hide").delay(5000);
        coins_sound.play();
        $(".gc2").removeClass("hide");
    
        
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
    } else if ((guess < previousGuess)&&(previousGuess < target)) {
        var previousGuess = p[0];
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>"); 
    } else if ((target < previousGuess)&&(previousGuess < guess)) {
        var previousGuess = p[0];
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>");
    } else if ((previousGuess < guess)&&(guess < target)) {
        var previousGuess = p[0];
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
    } else if ((target < guess)&&(guess < previousGuess)) {
        var previousGuess = p[0];
        $(".messageBox p:nth-child(2)").contents().remove();
        $(".displayOfGuess").contents().remove();
        $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
    }

}        

function restart() {                                            // Restart function doesn't work when the game is played multiple times
    target = getRandomInt(1, 100);                              // I do not understand why
    console.log(target);                                        // I'm returning everything to their original "state"
    $(".messageBox p:first h2").remove();
    $(".messageBox p:nth-child(2) h2").remove();
    $(".displayOfGuess p").remove();
    p.length = 0;
    $(".banner ").fadeOut("fast");
    var isVisible = $(".safe_open").is(":visible")              // This is designed to test for the safe's "state": open or closed
    var isHidden = $(".safe_open").is(":hidden")                // then, if open, toggle to the closed picture as part of the restart
    if ("isVisible") {                                          // Why can't I just use the "toggleClass" handler - 
        $(".safe_closed, .safe_open").toggleClass("hide");      // because if a player re-enters the winning number (twice), then the
    } else {                                                    // picture is in the wrong state when the game restarts
        return "isHidden";                                      // I do not know how to test this - principally because the entire restart function
    }                                                           // isn't working
    $(".gc2").addClass("hide");                             
    $("#inputBox").val("");                                     // I also added the if (previousGuess == target) to the checkAnswer function
}    

var kaching_sound = new Audio("audio/cash-register.wav");
var coins_sound = new Audio("audio/coins.wav");


$(document).ready(function () {

// Save the player's guess when player presses enter 
    $("#inputBox").keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            checkAnswer($("#inputBox").val());
            showBanner($("#inputBox").val());
            showGuesses($("#inputBox").val());
            $(".displayOfGuess").append("<p>" + p + "</p>");
        }

    });

// Save the player's guess if player clicks on "Submit
    $("#submitButton").click(function () {
        event.preventDefault();
        checkAnswer($("#inputBox").val());
        showBanner($("#inputBox").val());
        showGuesses($("#inputBox").val());
        $(".displayOfGuess").append("<p>" + p + "</p>");
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