function random() {
	Math.random();
}

prompt("Pick a number", " ");



while (value != random) {
  value = prompt("What is your guess?". " ");
  if (value = random) {
    alert ("You win!");
  }else if (value < random) {
    prompt("You are low.  Guess again", " ");
  }else (value > random) {
  	prompt("You are high.  Guess again", " ");
  }
};


