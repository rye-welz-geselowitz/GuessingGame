
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var prevGuesses=[];
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
	var playersGuess=+$('#guessInput').val();
	$('#guessInput').val("");
	return playersGuess;
}

// Determine if the next guess should be a lower or higher number

function guessMessage(playersGuess,winningNumber){
    var comparison=lowerOrHigher(playersGuess,winningNumber);
}
function lowerOrHigher(playersGuess,winningNumber){
	if(playersGuess>winningNumber){
	    return "higher";
	}
	else{
	    return "lower";
	}
	//WHAT ABOUT ==?
}

// Check if the Player's Guess is the winning number 

function checkGuess(playersGuess,winningNumber){
	if(winningNumber==playersGuess){
	    $('#feedback').text("YOU WON");
	}
	else{
	    $('#feedback').text("TRY AGAIN");
	}
	var inRange=(playersGuess>=0)&&(playersGuess<=100);
	if(inRange==false){
	    $('#feedback').text("Should be between 1 and 100.");
	}
	else if(prevGuesses.indexOf(playersGuess)==-1){
	    prevGuesses.push(playersGuess);
	}
	else{
	   $('#feedback').text("You already tried that..."); 
	}
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
        var playersGuess=playersGuessSubmission();
        alert(winningNumber);
        checkGuess(playersGuess,winningNumber);
        guessMessage(playersGuess,winningNumber);
    });
});