"use strict";

/*
	@Version Tues Sept 19 2017
	@Author Amanda Chan
	@Author
	Some basic framework.

	TODO:
		move classes into individial files, and
		figure out how to use REQUIREJS or something similar.
	TODO EventListener too general/broad. sub-class for specific events?
*/

/* GLOBAL VARIABLES */
const canvas = document.getElementById("canvas_id");
const ctx = canvas.getContext("2d"); //any object can access the context & draw stuff
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//To be defined after class definitions, in setup()
let ENGINE = null;
let EVENT_MANAGER = null;
/* end global variables */

/* enums */
//common color enum
let Colors = {
	RED: "rgba(255, 0, 0, 255)",
	GREEN: "rgba(0, 255, 0, 255)",
	BLUE: "rgba(0, 0, 255, 255)",
	WHITE: "rgba(255, 255, 255, 255)",
	BLACK: "rgba(0, 0, 0, 255)"
}

//event filter enum
//event hanlders can listen for specific events, which are organized by filter.
let EventFilter = {
	KEYBOARD: "KEYBOARD",
	COLLISION: "COLLISION",
	OTHER: "OTHER",
}

//speicifc events enum
let EventEnum = {
	KEY_DOWN_W: "KEY_DOWN_W",
	KEY_DOWN_A: "KEY_DOWN_A",
	KEY_DOWN_S: "KEY_DOWN_S",
	KEY_DOWN_D: "KEY_DOWN_D",

	KEY_UP_W: "KEY_UP_W",
	KEY_UP_A: "KEY_UP_A",
	KEY_UP_S: "KEY_UP_S",
	KEY_UP_D: "KEY_UP_D",

	OTHER: "OTHER"
};
/* end enums*/

/* CLASS DEFINITIONS */

//Updates & renders the current game state
class GameEngine {
	constructor() {
		// this.currentState = new GameState();
		this.currentState = new IdleGameState();
		//TODO define game objects, ex player, enemies, platforms, example:
		// this.gameObjects = new Array(); //list of all
		// this.gameObjects.push(new Player());
	}
	update() {
		this.currentState.update();
	}
	render() {
		this.currentState.render();
	}

	//transition from the current state to a new state, ex from the start menu to the playing state.
	enterState(newState) {
		this.currentState.onExit();
		this.currentState = newState;
		this.currentState.onEnter();
	}
}

//A GameState allows for the GameEngine to have different behaviours depending
//on a state (as opposed to switch statements to determine behaviour)
//the GameEngine updates & renders a current state, and can switch to a different one when needed.
//Extend to create different states, (ex playing, paused, start menu, game over)
class GameState {
	update() {}
	render() {}
	onEnter() {} //entry logic, ex. start a timer
	onExit() {} //exit logic, ex stop a timer
	// add entry/exit conditions if needed
}

//sample GameState
class IdleGameState extends GameState {
	update() {
		//do idle stuff
	}
	render() {
		//display idle elements
		ctx.fillStyle = Colors.WHITE; //background
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		//random square
		ctx.fillStyle = Colors.BLUE;
		ctx.fillRect(0, 0, 10, 10);
	}
}

//TODO reconsider needs of this class
//add an instance of this class to any object who wants to listen for and handle events.
class EventListener {
	constructor(...filters) {
		for (let f of filters) {
			EVENT_MANAGER.registerListener(f, this);
		}
	}
	notify(event) {
		//handle event here
		// console.log("event received.");
	}
}


// all events from some source are sent to/received by the EventManager,
// which dequeues and sends the events to any registered listeners.
class EventManager {
	constructor() {
		this.eventQueue = new Array();
		this.eventListeners = new Map(); //map an array of EventListeners to EventFilters.
		for (let filter in EventFilter) { //create a new array for each EventFilter in the enum.
			this.eventListeners.set(filter, new Array());
		}
	}

	registerListener(filter, listener) {
		let arr = this.eventListeners.get(filter); //get corresponding array of listeners.
		if (arr != undefined) {
			arr.push(listener);
		}
	}

	// add a Event to the queue
	enqueue(event) {
		if (event instanceof Event) {
			this.eventQueue.push(event); //add event to the end of the array
		} else {
			throw new TypeError(event + " is not an instance of Event.");
		}
	}

	//get the next event from the queue, and notify the appropriate listeners
	//based on the event's filter.
	dequeue() {
		if (this.eventQueue.length > 0) {
			let evt = this.eventQueue.shift(); //remove event from the front of the array
			let listeners = this.eventListeners.get(evt.getEventFilter());
			listeners.forEach(function(listener) {
				listener.notify(evt);
			});
		}
	}
}


// base game Event class.
// input events or game objects can create a Event, which can be placed on the
// event queue in the EventManager; the appropriate listeners will be notified.
// not to be confused with Event and event objects in html.
class Event {
	constructor(eventFilter = EventFilter.OTHER, eventEnum = EventEnum.OTHER, data = null) {
		this.eventFilter = eventFilter;
		this.eventEnum = eventEnum;
		this.data = data;
	}
	getEventFilter() {
		return this.eventFilter;
	}
	getEventEnum() {
		return this.eventEnum;
	}
	getData() {
		return this.data;
	}
}

/* end CLASS DEFINITIONS */




//entry method: called by the html, after page is done loading (html's script tag must use the "defer" attribute)
function setup() {
	console.log("setup");

	//define class instances here
	ENGINE = new GameEngine();
	EVENT_MANAGER = new EventManager();

	//test
	// let testListener = new EventListener(EventFilter.OTHER);
	// EVENT_MANAGER.enqueue(new Event());
	// EVENT_MANAGER.dequeue();

	window.requestAnimationFrame(update); //starts the game update loop
}


//main game loop
function update() {
	EVENT_MANAGER.dequeue();
	ENGINE.update();
	ENGINE.render();
	window.requestAnimationFrame(update); //continue looping
}
