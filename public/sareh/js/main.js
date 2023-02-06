
/*AQUI COMIENZA FELIX*/

// Constants
const ACTIVE_TIME_MS = 5000;
const DEACTIVATION_TIME_MS = 750;

// Variables
var felix = document.getElementById("felix");
var responseFrame = document.getElementById("response-frame");
var responseMessage = document.getElementById("response-message");
var userMadeDecision = false;
var jokes = [
	'I ate a clock yesterday, it was very time-consuming.',
	'A perfectionist walked into a bar…apparently, the bar wasn’t set high enough.',
	'Employee of the month is a good example of how somebody can be both a winner and a loser at the same time.',
	'I don’t have a girlfriend, but I know a girl that would get really mad if she heard me say that.',
	'Relationships are great, but have you ever had stuffed crust pizza?',
	'The worst time to have a heart attack is during a game of charades.',
	'My therapist says I have a preoccupation with vengeance. We’ll see about that.',
	'I have a friend. He keeps trying to convince me he’s a compulsive liar, but I don’t believe him.'
];

// Activate felix and set timeout for awaiting a command.
function activateFelix() {
	userMadeDecision = false;
	felix.classList.remove("inactive");
	felix.classList.add("active");
	setTimeout(function() {
		if (!userMadeDecision) {
			felix.classList.remove("active");
			felix.classList.add("inactive");
			setTimeout(function() {
				felix.classList.remove("inactive");
			}, 750);
		}
	}, 5000);
}
function deactivateFelix() {
	userMadeDecision = true;
	felix.classList.remove("active");
	felix.classList.add("inactive");
	setTimeout(function() {
		felix.classList.remove("inactive");
	}, 750);
}

/*AQUI TERMINA FELIX*/
/*GRACIAS https://codepen.io/tacosontitan/pen/LYEYBxe */