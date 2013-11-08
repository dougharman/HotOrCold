function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
alert(getRandomInt(10,1000));

function game() {
var answer = getRandomInt;
var guess = document.userInput.value;

while (guess != answer) {
    guess = prompt("Your guess?", " ");
    if (guess == answer) {
        alert("You win!");
        break;
    }
    else if (guess < answer || guess > answer) {
        prompt("Try again!");
    }
    else if (guess == "NaN") {
        prompt("Numbers only!");
    }
}
}