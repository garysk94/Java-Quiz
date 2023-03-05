//Will show the  Score List 
var list = document.querySelector("#scorelist");
var scoresList = [];
console.log(scoresList);

function renderScore () {
	list.innerHTML = "";
	
	for (var i = 0; i < scoresList.length; i++) {
		var highS = scoresList[i];
		var liEl = document.createElement("li");
		liEl.textContent = `${highS.name} ${highS.score}`; 
		liEl.setAttribute("data-index", i);
		list.appendChild(liEl);
	}
};

function init() {
	var highScores = JSON.parse(localStorage.getItem("highScores"));
	if (highScores !== null) {
		scoresList = highScores;
	}
	console.log(scoresList);
	renderScore();
};

init();


