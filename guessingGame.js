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

function guessMessage(playersGuess,winningNumber,prevGuesses){
	var guessesRemaining=(20-(prevGuesses.length+1));
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
    var message="Your guess, "+playersGuess+ ", was "+comparison+" than the winning number. "+distMessage;
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

function checkGuess(playersGuess,winningNumber,prevGuesses){
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
		guessMessage(playersGuess,winningNumber,prevGuesses);
	    prevGuesses.push(playersGuess);
	    //guessesRemaining--;
	}
	else{
	   $('#feedback').text("You already tried that..."); 
	}
	return prevGuesses;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(guessesRemaining,winningNumber){
	var numOptions;
	//alert(guessesRemaining);
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
	var winningNumber=generateWinningNumber();
	$('#loser').hide();
	$('#winner').hide();
	$('#stillGoing').show();
	$('#feedback').text("");
	$('#feedback2').text("");
	$('#hint').text("");
	$('#guessesLeft').text("20 guesses remaining");
	return winningNumber;
}

function guessSubmission(winningNumber,prevGuesses){
	var playersGuess=playersGuessSubmission();
    //alert(winningNumber);
    $('#feedback2').text("");
    prevGuesses=checkGuess(playersGuess,winningNumber,prevGuesses);
    var guessesRemaining=20-prevGuesses.length;
    checkLoser(guessesRemaining,winningNumber);
    return prevGuesses;
    //return [playersGuess,prevGuesses];
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
/*
	function generateVariables(){
		var prevGuesses=[];
		var winningNumber=generateWinningNumber();
		function f0(prevGuesses,winningNumber){
			prevGuesses=guessSubmission(winningNumber,prevGuesses);
		}
		function f1(){
			winningNumber=reset(prevGuesses);
        	prevGuesses=[];
			
		}
		function f2(prevGuesses,winningNumber){
			var guessesRemaining=(20-prevGuesses.length);
        	provideHint(guessesRemaining,winningNumber);
		}
		return [f0,f1,f2];
	}
	var funcArr=generateVariables();
	$('.submitGuess').on('click',function(){
    	funcArr[0]();
    });
    $('#guessInput').keypress(function(e) {
	  if (e.which == '13') {
	     funcArr[0]();
   }
	});
    $('.playAgain').on('click',function(){
        funcArr[1]();
    });
    $('.hint').on('click',function(){
    	funcArr[2]();
    });
});
*/
	
    var prevGuesses=[];
	var winningNumber=generateWinningNumber();
    $('.submitGuess').on('click',function(){
    	prevGuesses=guessSubmission(winningNumber,prevGuesses);
    });
    $('#guessInput').keypress(function(e) {
	  if (e.which == '13') {
	     prevGuesses=guessSubmission(winningNumber,prevGuesses);
   }
	});
    $('.playAgain').on('click',function(){
        winningNumber=reset();
        prevGuesses=[] //how to eliminate global vars???
    });
    $('.hint').on('click',function(){
    	var guessesRemaining=(20-prevGuesses.length);
        provideHint(guessesRemaining,winningNumber);
    });

});