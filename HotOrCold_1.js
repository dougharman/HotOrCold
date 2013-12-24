function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var target = getRandomInt(1, 100);
console.log(target);

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
    
    if (previousGuess == target) {                                      
        restart();                                                     
    }
    else if (guess == target) {
        
        $(".messageBox p:nth-child(2)").addClass("hide");
       
        $(".displayOfGuess").addClass("hide");
        $(".messageBox p:first").append("<h2>You Win!</h2>");
        kaching_sound.play();

        $(".safe_closed, .safe_open").toggleClass("hide").delay(5000);
        coins_sound.play();
        $(".banner, ._1").fadeIn("fast");
        $("._2").fadeIn("700");
        $("._3").fadeIn("900");
        $(".gc2").removeClass("hide");
    
        
// Plugin code for "modern blink"
      
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
    } else if ((guess - target) < 0 ) {
        if ((guess < previousGuess)&&(previousGuess < target)) {
            var previousGuess = p[0];
            $(".messageBox p:nth-child(2)").contents().remove();
            $(".displayOfGuess").contents().remove();
            $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>"); 
        } else if ((previousGuess < guess)&&(guess < target)) {
            var previousGuess = p[0];
            $(".messageBox p:nth-child(2)").contents().remove();
            $(".displayOfGuess").contents().remove();
            $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
        } else if ((previousGuess - target) >= 1 ) {
            var previousGuess = p[0];
            $(".messageBox p:nth-child(2)").contents().remove();
            $(".displayOfGuess").contents().remove();
            $(".messageBox p:nth-child(2)").append("<h2>You flipped!  You're now Below the Answer<h2>");   
        }
    } else if ((guess - target) >= 1 ) { 
        if ((target < previousGuess)&&(previousGuess < guess)) {
            var previousGuess = p[0];
            $(".messageBox p:nth-child(2)").contents().remove();
            $(".displayOfGuess").contents().remove();
            $(".messageBox p:nth-child(2)").append("<h2>You're Getting Colder</h2>");  
        } else if ((target < guess)&&(guess < previousGuess)) {
            var previousGuess = p[0];
            $(".messageBox p:nth-child(2)").contents().remove();
            $(".displayOfGuess").contents().remove();
            $(".messageBox p:nth-child(2)").append("<h2>You're Getting Hotter<h2>");
        } else if ((previousGuess - target) < 0 ) {
         var previousGuess = p[0];
            $(".messageBox p:nth-child(2)").contents().remove();
            $(".displayOfGuess").contents().remove();
            $(".messageBox p:nth-child(2)").append("<h2>You flipped!  You're now Above the Answer<h2>");   
        } 
    }
}        

// Restart function doesn't work when the game is played multiple times
function restart() {                                           
    target = getRandomInt(1, 100);                              
    console.log(target);                                        
    $(".messageBox p:first h2").remove();
    $(".messageBox p:nth-child(2)").removeClass("hide");
    $(".displayOfGuess p").removeClass("hide");
    p.length = 0;
    $(".banner, ._1, ._2, ._3").fadeOut("fast");
    $(".messageBox p:nth-child(2)").contents().remove();
    $(".displayOfGuess").contents().remove();

// This is designed to test for the safe's "state": open or closed.  It's not working!!!
    var isVisible = $(".safe_open").is(":visible")              
    var isHidden = $(".safe_open").is(":hidden")                
    if ("isVisible") {                                          
        $(".safe_closed, .safe_open").toggleClass("hide");      
    } else {                                                    
        return "isHidden";                                     
    }                                                          
    $(".gc2").addClass("hide");
    $("#inputBox").val("");                                     
}    

var kaching_sound = new Audio("audio/cash-register.wav");
var coins_sound = new Audio("audio/coins.wav");


$(document).ready(function () {

// Save the player's guess when player presses "enter" 
    $("#inputBox").keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            checkAnswer($("#inputBox").val());
            showGuesses($("#inputBox").val());
            $(".displayOfGuess").append("<p>" + p + "</p>");
        }

    });

// Save the player's guess if player clicks on "Submit"
    $("#submitButton").click(function () {
        event.preventDefault();
        checkAnswer($("#inputBox").val());
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