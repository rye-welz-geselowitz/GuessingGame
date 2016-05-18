/* **** Guessing Game Functions **** */

// Generate the Winning Number

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWinningNumber(){
	return getRandomIntInclusive(1,100);
}

//Generate guess engine
function GuessEngine(){
	this.prevGuesses=[];
	this.winningNumber=generateWinningNumber();
	this.guessMessage=function(playersGuess){
		$('#hint').text("");
		var guessesRemaining=(20-(this.prevGuesses.length+1));
		$('#guessesLeft').text(guessesRemaining+" guesses remaining.");
		if (playersGuess==this.winningNumber){
			return;
		}
		var inRange=(playersGuess>=1)&&(playersGuess<=100);
		if(inRange==false){
		    return;
		}
	    var comparison=lowerOrHigher(playersGuess,this.winningNumber);
	    var distMessage=getDistance(playersGuess,this.winningNumber);
	    var message="Your guess, "+playersGuess+ ", was "+comparison+" than the winning number. "+distMessage;
	    $('#feedback2').text(message);
	}
	this.checkGuess=function(playersGuess){
		if(this.winningNumber==playersGuess){
			rewardWinner();
		}
		else{
	    	$('#feedback').text("TRY AGAIN");
		}	
		var inRange=(playersGuess>=1)&&(playersGuess<=100);
		if(inRange==false){
	    	$('#feedback').text("Should be between 1 and 100.");
		}
		else if(this.prevGuesses.indexOf(playersGuess)==-1){
			this.guessMessage(playersGuess);
	    	this.prevGuesses.push(playersGuess);
		}
		else{
	   		$('#feedback').text("You already tried that...");
		}
	}
	this.takeGuess=function(){
		var playersGuess=playersGuessSubmission();
		$('#feedback2').text("");
		this.checkGuess(playersGuess);
		var guessesRemaining=20-this.prevGuesses.length;
	    checkLoser(guessesRemaining,this.winningNumber);
	}

	this.reset=function(){
		this.winningNumber=generateWinningNumber();
		this.prevGuesses=[];
		$('#loser').hide();
		$('#winner').hide();
		$('#stillGoing').show();
		$('#feedback').text("");
		$('#feedback2').text("");
		$('#hint').text("");
		$('#guessesLeft').text("20 guesses remaining");
    	
	}
	this.giveHint=function(){
		var guessesRemaining=(20-this.prevGuesses.length);
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
		var options=[this.winningNumber];
		var curr;
		while(options.length<numOptions){
			curr=getRandomIntInclusive(0, 100);
			options.push(curr);
		}
		options.sort(function(a, b){return a-b})
		var optionsString=options.join(", ");
		$('#hint').text("The number is one of the following: "+optionsString);
	};
}
	
function playersGuessSubmission(){
	var playersGuess=+$('#guessInput').val();
	$('#guessInput').val("");
	return playersGuess;
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

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
	var guessEngine=new GuessEngine();
	$('.submitGuess').on('click',function(){
		guessEngine.takeGuess();
	});
    $('#guessInput').keypress(function(e) {
		if (e.which == '13') {
			guessEngine.takeGuess();
   	 	}
	});
    $('.playAgain').on('click',function(){
    	guessEngine.reset();
    });
    $('.hint').on('click',function(){
    	guessEngine.giveHint();
    });
});