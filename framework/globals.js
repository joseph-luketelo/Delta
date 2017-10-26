//Declare at the top for full global scope
const CANVAS = document.getElementById("canvas_id");
const CTX = CANVAS.getContext("2d"); //any object can access the context & draw stuff
const WIDTH = CANVAS.width;
const HEIGHT = CANVAS.height;

let ENGINE = undefined;


// Utility functions
const randInt = function(min, max) {
	return Math.random() * (max - min) + min;
}
