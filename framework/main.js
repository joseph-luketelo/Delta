/*
	Set up global references to html elements, like the canvas and context
	Contains entry and main loop methods that are called by the page on load.
*/

//Define globals declared in globals.js
ENGINE = new GameEngine();

//entry method: called by the html page, after it's is done loading (script tags must use the "defer" attribute)
function setup() {
	const instructions = "setup\nwasd: move/rotate\ng: shoot";
	console.log(instructions);

	//add key event listeners
	document.addEventListener("keydown", function(event) {
		ENGINE.receiveRawKeyEvent(event, true);
	});
	document.addEventListener("keyup", function(event) {
		ENGINE.receiveRawKeyEvent(event, false);
	});

	ENGINE.start();
	TestSuite.runTests();
	window.requestAnimationFrame(update); //starts the game update loop
}

//main game loop, called every frame.
function update() {
	ENGINE.update();
	ENGINE.render();
	window.requestAnimationFrame(update); //continue looping
}
