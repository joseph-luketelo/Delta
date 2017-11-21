//contains global objects & functions.


//Global objects from the DOM
const CANVAS = document.getElementById("canvas_id");
const CTX = CANVAS.getContext("2d"); //any object can access the context & draw stuff
const WIDTH = CANVAS.width;
const HEIGHT = CANVAS.height;

//Global game objects (to be defined in main.js)
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

// convenience method for displaying text. NOTE: only centers. need more funcitonlaity for l/r justify
const fillText = function(text, x, y, font, ctx = CTX) {
	ctx.font = font.str;
	const w = (text.length/2) * (font.size/1.75);
	ctx.fillText(text, x - w, y);
}
