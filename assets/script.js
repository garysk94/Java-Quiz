var secondsLeft = 60;
var questionChk = 0;
var time;
var userScore;
var a1El = document.querySelector('#a1');
var a2El = document.querySelector('#a2');
var a3El = document.querySelector('#a3');
var a4El = document.querySelector('#a4');
var startGame = document.querySelector("#startGame");
var timerEl = document.querySelector('#timer');
var questionEl = document.querySelector('#question');
var introEl = document.querySelector("#quiz1");
var quizEl = document.querySelector("#quiz");
var wrongEl = document.querySelector("#wrong");
var restartButton = document.getElementById('restart');
var mainEl = document.querySelector('main');
var sectionEl = document.createElement("section");
var h1El = document.createElement("h1");
var h2El = document.createElement("h2");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var buttonEl = document.createElement("button");

//questios and the options 
var questions = [
	{
		question: "The condition in an if / else statement is enclosed within ____.",
		a1: "quotes",
		a2: "curly brackets",
		a3: "parentheses",
		a4: "square brackets",
		answer: "parentheses"
	},
	{
		question:"Adds new elements to the beginning of an array, and returns the new length",
		a1: "unshift()",
		a2: "Operators",
		a3: ".innerHTML",
		a4: "Do While Loop",
		answer: "unshift()"
	},
	{
		question: "Removes the first element of an array and returns that element",
		a1: "Dynamic Typing",
		a2: "shift()",
		a3: "Function", 
		a4: "push()",
		answer: "shift()"
	},
	{
		question: "Can read and alter the elements on a webpage",
		a1: "addEventListener",
		a2:"For Loop Example",
		a3: "intervalid",
		a4: ".innerHTML",
		answer: ".innerHTML"
	}];



//Starts the time 
function startTimer() {
	time = setInterval(
		function () {
			secondsLeft--;
			timerEl.textContent = `Timer: ${secondsLeft}`;
			if (secondsLeft === 0) {
				userScore = 0;
				clearInterval(time);
				timerEl.textContent = " ";
				alert("Times Up!");
				userScore = 0;
				enterHiSc();
			}
		}, 1500);
};

//Starts the quiz
startGame.addEventListener("click", startQuiz);
function startQuiz() {
	userScore = 0;
	startTimer();
	introEl.setAttribute("style", "display: none");
	quizEl.setAttribute("style", "display: block");
	loadQuestions();
};

//Shows question and the possible answers.
function loadQuestions() {
	questionEl.textContent = questions[questionChk].question;
	a1El.textContent = `${questions[questionChk].a1}`;
	a2El.textContent = `${questions[questionChk].a2}`;
	a3El.textContent = `${questions[questionChk].a3}`;
	a4El.textContent = `${questions[questionChk].a4}`;
};

//Checks if the answer is right on worng 
quizEl.addEventListener("click", function (event) {
	var element = event.target;
	if (element.matches(".quizB")) {
		var check = element.innerText;
		if (check === questions[questionChk].answer) {
			secondsLeft = secondsLeft + 5;
			alert("Correct!");
			wrongEl.textContent = " ";
			//Runs through the questions
			var aLength = questions.length - 1;
			if (questionChk < aLength) {
				questionChk++;
				loadQuestions();
			} else {
				alert("All Done!");
				userScore = secondsLeft;
				clearInterval(time);
				timerEl.textContent = " ";
				enterHiSc();
			}
		} else {
			secondsLeft = secondsLeft - 5;
			wrongEl.textContent = "Incorrect -5 seconds";
			if (secondsLeft <= 0) {
				userScore = 0;
				clearInterval(time);
				timerEl.textContent = " ";
				alert("Ran out of time!");
				enterHiSc();
			}
		}
	}
});

function enterHiSc() {
	quizEl.setAttribute("style", "display: none");

	mainEl.appendChild(sectionEl);
	sectionEl.appendChild(h1El);
	sectionEl.appendChild(h2El);
	sectionEl.appendChild(labelEl);
	sectionEl.appendChild(inputEl);
	sectionEl.appendChild(buttonEl);

	sectionEl.setAttribute("class", "sectionEl");
	h1El.setAttribute("class", "h1El");
	h2El.setAttribute("class", "h2El");
	labelEl.setAttribute("class", "labelEl");
	inputEl.setAttribute("class", "inputEl");
	inputEl.setAttribute("placeholder", "...");
	buttonEl.setAttribute("class", "buttonEl");

	h1El.textContent = "Thank You for playing the quiz!";
	h2El.textContent = `Your score is ${userScore}.`;
	labelEl.textContent = "Please enter NAME: ";
	buttonEl.textContent = "SAVE";

	//Save values to array
	buttonEl.addEventListener("click", function (event) {
		event.preventDefault();
		var highScore =JSON.parse(localStorage.getItem("highScores")) || [];

		var highScores = {
			name: inputEl.value.trim(),
			score: userScore
		};

		highScore.push(highScores);

		localStorage.setItem("highScores", JSON.stringify(highScore));
	});
};




//Restarts the quize 
function restartQuiz() {
	location.reload();
  };
  
restartButton.addEventListener("click", restartQuiz);

