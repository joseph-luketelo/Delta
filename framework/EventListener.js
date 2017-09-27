/*
	Class used for handling Events.
	An EventListener chooses a filter for the Events it wants to handle.
	Must be registered to a GameState in order to receive events from an EventQueue.

	// Example & Usage:

	//create listener
	let doorListener = new EventListener(EventFilter.GAME_EVENT, function(doorEvent) {
		console.log("a door was opened.");
	});

	// Add the listener
	// if the listener belongs to a GameObject or System, add it to the GameObject's list of listeners.
	object.addEventListener(doorListener); // A) add externally from game engine's constructor
	this.addEventListener(doorListener);   // B) or add internally within the object's constructor

	// Registerh the listener(s)
	// register the gameObject's/state's listeners to a GameState for it to be notified of events:
	gameState.registerEventListeners(object.getEventListeners());
	gameState.registerEventListener(doorListener); //standalone event listener:

*/

class EventListener {
	// @param filter: the EventFilter this class is interested in.
	// @param eventHandler: a callback/method that takes an Event as its parameter.
	// The given method is invoked when this listener's handleEvent(e) method is called.
	constructor(filter, eventHandler) {
		if (!EventFilter.hasOwnProperty("" + filter) || typeof eventHandler != "function") {
			throw new TypeError("invalid constructor arguments");
		}
		this.eventHandler = eventHandler;
		this.filter = filter;
	}

	//@param event an Event to handle
	handleEvent(event) {
		if (event instanceof Event == false) { throw new TypeError(); }
		this.eventHandler(event);
	}

	getEventFilter() {
		return this.filter;
	}
}
