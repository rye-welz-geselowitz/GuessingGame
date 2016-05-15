//k/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess
var winningNumber=generateWinningNumber();

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWinningNumber(){
	return getRandomIntInclusive(1,100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess=$(this).val();
	alert(playersGuess);
	$(this).val("");
	
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
    $('.submitGuess').on('click',function(){
        var playersGuess=$(this).val();
        alert(playersGuess);
        playersGuessSubmission();
    });
});