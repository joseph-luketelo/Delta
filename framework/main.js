"use strict";


/* GLOBAL VARIABLES */
const CANVAS = document.getElementById("canvas_id");
const CTX = CANVAS.getContext("2d"); //any object can access the context & draw stuff
const WIDTH = CANVAS.width;
const HEIGHT = CANVAS.height;
const ENGINE = new GameEngine();

//entry method: called by the html, after page is done loading (html's script tag must use the "defer" attribute)
function setup() {
	console.log("setup");
	
	//add key event listeners
	document.addEventListener("keydown", function(event) {
	   ENGINE.receiveRawKeyEvent(event, true);
	});
	document.addEventListener("keyup", function(event) {
	   ENGINE.receiveRawKeyEvent(event, false);
	});
	
	test(); //for testing
	window.requestAnimationFrame(update); //starts the game update loop
}

//main game loop
function update() {
	ENGINE.update();
	ENGINE.render();
	// console.log(ENGINE.getKeyState().getKey('w'));
	window.requestAnimationFrame(update); //continue looping
}

//for testing
function test() {
	let map = new ListenerMap();
	let el = new EventListener(function(e) {
		console.log(e);
	}, EventFilter.OTHER);
	map.addListener(el);
	
	
}
