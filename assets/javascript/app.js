$(document).ready(function() {

	//Variables
	var currentQ;	

	var correctAnswer;
	var wrongAnswer;
	var unanswered;	
    var answered; 
					
	var seconds;
	var time;		
	
	var userChoice;

	var text = {
		correct: "Correct ! You are unbeatable",
		incorrect: "Aie, May be try to study this question again",
		noTime: "Time out ! I hope you're faster on the field !",
		done: "Good job, Do you want to play again ?",
	};

	var triviaQuestions = [
		{	
			question: "Which teams has won the 2018 World Cup?",
			choices: ["Brazil", "Germany", "France", "Croatia", "Argentina"],
			correct: 2,
			image: "assets/images/france.jpg",
			answerText: "France has won his second world cup thanks to a victory 4-2 against Croatia !",
		},

		{
			question: "Who was the best scorer ?",
			choices: ["Romelu Lukaku", "Eden Hazard", "Killian Mbappe", "Harry Kane", "Mario Mandzukic"],
			correct: 3,
			image: "assets/images/kane.jpg",
			answerText: "Harry Kane has scored 6 goals in 573 minutes on the field !",
		},

		{
			question: "Who was the best young player ?",
			choices: ["Ousmane Dembele", "Killian Mbappe", "Vinicius Junior", "Marcus Rashford", "Paulo Dybala"],
			correct: 1,
			image: "assets/images/mbappe.jpg",
			answerText: "Killian Mbappe, only 19 when he won it with 4 goals !",
		},

		{
			question: "Who was the best player ?",
			choices: ["Antoine Griezmann", "Luka Modric", "Eden Hazard", "Messi", "Neymar"],
			correct: 1,
			image: "assets/images/modric.jpg",
			answerText: "The Real Madrid's player Luka Modric has won it thanks to incredible performances that allow his team to go in final !",
		},
		{
			question: "What's was the host country ?",
			choices: ["Germany", "France", "Russia", "Sweden", "Qatar"],
			correct: 2,
			image: "assets/images/russia.jpg",
			answerText: 'The 2018 World Cup has took place in Russia from June 14th to July 15th !',
		},
		{
			question: "Who has scored the most amazind goal of this world cup ?",
			choices: ["Benjamin Pavard", "Killian Mbappe", "Lionel Messi", "Cristiano Ronaldo", "Neymar"],
			correct: 0,
			image: "assets/images/pavard.jpg",
			answerText: "Benjamin Pavard has scored an incredible goal for France against Argentina in the round of 16th"
		},
	];

	// Hide content start
	$("#gameArea").hide();

	// Start Button
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	
    //Function to Start Game After Initial Click

	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}
	// Display Questions
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
		answered = true;
		// Prints Question from Array
		$(".question").html(triviaQuestions[currentQ].question);

	// Loops choices and appends
		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

	//timer
		countdown();

	//userchoice
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// timer countdown
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
	    //Delay of 1 second
		time = setInterval(countDownSho, 1000);
	}

	// Show timer
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	
	// Display answer
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		//GIF IMG
		var jpgLink = triviaQuestions[currentQ].image;
		var jpg = $("<img>");
		jpg.attr("Src", jpgLink);
		jpg.addClass("jpgImg");
		$("#jpg").html(jpg);
		// GIF TEXT
		var jpgText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(jpgText);
			newCap.addClass("jpgCap");
			$("#jpgText").html(newCap);


		// DISPLAYS AND COUNTS USER ANSWERS/ UnANSWERS
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});
