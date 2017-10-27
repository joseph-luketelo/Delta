//Declare at the top for full global scope
const CANVAS = document.getElementById("canvas_id");
const CTX = CANVAS.getContext("2d"); //any object can access the context & draw stuff
const WIDTH = CANVAS.width;
const HEIGHT = CANVAS.height;

let ENGINE = undefined;




/* Utility functions */
const randInt = function(min, max) { //return rand int in range [min, max)
	return Math.floor(Math.random() * (max - min) + min);
}

const randFloat = function(min, max) { //return rand int in range [min, max)
	return Math.random() * (max - min) + min;
}

// AKN: https://stackoverflow.com/questions/8611830/javascript-random-positive-or-negative-number
const randSign = function() { // return 1 or -1
	return Math.round(Math.random()) * 2 -1;
}
