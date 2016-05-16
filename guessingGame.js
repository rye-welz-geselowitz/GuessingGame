
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var prevGuesses=[];
var winningNumber=generateWinningNumber();
var guessesRemaining=20;

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

function guessMessage(playersGuess,winningNumber,guessesRemaining){
	$('#guessesLeft').text(guessesRemaining+" guesses remaining.");
	if (playersGuess==winningNumber){
		return;
	}
	var inRange=(playersGuess>=1)&&(playersGuess<=100);
	if(inRange==false){
	    return;
	}
    var comparison=lowerOrHigher(playersGuess,winningNumber);
    var distMessage=getDistance(playersGuess,winningNumber);
    var message="Your guess was "+comparison+" than the winning number. "+distMessage;
    $('#feedback2').text(message);
    
}
function lowerOrHigher(playersGuess,winningNumber){
	if(playersGuess>winningNumber){
	    return "higher";
	}
	else if (playersGuess<winningNumber){
	    return "lower";
	}
}
function getDistance(playersGuess,winningNumber){
	var difference=Math.abs(playersGuess-winningNumber);
	if (difference<=5){
		return "But you were within 5 digits!"
	}
	if (difference<=10){
		return "But you were within 10 digits!"
	}
	if (difference<=20){
		return "But you were within 20 digits!"
	}
	else{
		return "And you were more than 20 digits from the winning number. Sad."
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(playersGuess,winningNumber,guessesRemaining){
	if(winningNumber==playersGuess){
	    //$('#feedback').text("YOU WON");
	    rewardWinner();
	}
	else{
	    $('#feedback').text("TRY AGAIN");
	}
	var inRange=(playersGuess>=1)&&(playersGuess<=100);
	if(inRange==false){
	    $('#feedback').text("Should be between 1 and 100.");
	}
	else if(prevGuesses.indexOf(playersGuess)==-1){
	    prevGuesses.push(playersGuess);
	    guessesRemaining--;
	}
	else{
	   $('#feedback').text("You already tried that..."); 
	}
	return guessesRemaining;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(guessesRemaining,winningNumber){
	alert(winningNumber);
	var numOptions;
	if(guessesRemaining>=5){
		numOptions=10;
	}
	else if(guessesRemaining==4){
		numOptions=8;
	}
	else if(guessesRemaining==3){
		numOptions=6;
	}
	else if(guessesRemaining==2){
		numOptions=4;
	}
	else if(guessesRemaining==1){
		numOptions=2;
	}
	var options=[winningNumber];
	var curr;
	while(options.length<numOptions){
		curr=getRandomIntInclusive(0, 100);
		options.push(curr);
	}
	options.sort(function(a, b){return a-b})
	var optionsString=options.join(", ");
	$('#hint').text("The number is one of the following: "+optionsString);
	//TODO: FINISH!!!!
}

// Allow the "Player" to Play Again

function rewardWinner(){
	$('#stillGoing').hide();
	$('#winner').show();
}
function checkLoser(guessesRemaining,winningNumber){
	if(guessesRemaining==0){
		$('#stillGoing').hide();
		$('#loser').show();
		$('#reveal').text("The winning number was "+winningNumber);
	}
}
function reset(){
	var prevGuesses=[];
	var winningNumber=generateWinningNumber();
	var guessesRemaining=20;
	var newGlobalVars=[prevGuesses,winningNumber,guessesRemaining];
	$('#loser').hide();
	$('#winner').hide();
	$('#stillGoing').show();
	$('#feedback').text("");
	$('#feedback2').text("");
	$('#hint').text("");
	$('#guessesLeft').text("20 guesses remaining");
	return newGlobalVars;
}

function guessSubmission(){
	var playersGuess=playersGuessSubmission();
    alert(winningNumber);
    $('#feedback2').text("");
    guessesRemaining=checkGuess(playersGuess,winningNumber,guessesRemaining);
    guessMessage(playersGuess,winningNumber,guessesRemaining);
    checkLoser(guessesRemaining,winningNumber);
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
    
    $('.submitGuess').on('click',function(){
    	guessSubmission();
        /*var playersGuess=playersGuessSubmission();
        alert(winningNumber);
        $('#feedback2').text("");
        guessesRemaining=checkGuess(playersGuess,winningNumber,guessesRemaining);
        guessMessage(playersGuess,winningNumber,guessesRemaining);
        checkLoser(guessesRemaining,winningNumber);*/
    });
    $('#guessInput').keypress(function(e) {
	  if (e.which == '13') {
	     guessSubmission();
   }
});
    $('.playAgain').on('click',function(){
        var newGlobalVars=reset();
        prevGuesses=newGlobalVars[0];
        winningNumber=newGlobalVars[1];
        guessesRemaining=newGlobalVars[2];
    });
    $('.hint').on('click',function(){
        provideHint(guessesRemaining,winningNumber);
    });
});