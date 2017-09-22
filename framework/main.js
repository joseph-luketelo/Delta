"use strict";

/*
	Entry and main loop methods.
*/


/* GLOBAL VARIABLES */
const CANVAS = document.getElementById("canvas_id");
const CTX = CANVAS.getContext("2d"); //any object can access the context & draw stuff
const WIDTH = CANVAS.width;
const HEIGHT = CANVAS.height;
const ENGINE = new GameEngine();

//entry method: called by the html page, after it's is done loading (script tags must use the "defer" attribute)
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

//main game loop, called every frame.
function update() {
	ENGINE.update();
	ENGINE.render();
	window.requestAnimationFrame(update); //continue looping
}

//for testing
function test() {
	
	let map = new ListenerMap();
	let el = new EventListener(EventFilter.OTHER, function(e) {
		console.log(e);
	});
	map.addListener(el);
	
	let evt = EventEnum.GAME_EVENT_DOOR_OPEN;
	switch (evt) {
		case EventEnum.GAME_EVENT_DOOR_OPEN:
			// console.log("door");
			break;
		default:
			console.log("default");
			break;
	}
	// console.log(ENGINE.getKeyState().getKey('w'));
}
