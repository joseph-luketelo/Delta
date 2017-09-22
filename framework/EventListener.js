/*
	Class used for handling events from a specific filter.
	An EventListener chooses a filter for the Events it wants to receive.
	In the constructor, An EventListener also takes a method, that is called
	when an event is received.
	
	// example
	//create the listener
	let doorListener = new EventListener(EventFilter.GAME_EVENT, function(doorEvent) {
		console.log("a door was opened " + doorEvent);
	);
	
	//add it to the owning object's list. GameObjects and GameStates have lists of EventListeners.
	this.eventListeners.addListener(doorListener);
	
*/
class EventListener {
	// @param filter: the EventFilter this class is interested in.
	// @param eventHandler: a method that takes an Event as its parameter. this
	// method is invoked when this listener's handleEvent(e) method is called.
	constructor(filter, eventHandler) {
		if (eventHandler == undefined || filter == undefined) {
			throw new TypeError("argument error: " + " EventListener(" + eventHandler + ", " + filter + ")");
		}
		this.eventHandler = eventHandler;
		this.filter = filter;
	}
	//@param event an Event to handle
	handleEvent(event) {
		if (event instanceof Event) { //TODO check if event is of the correct filter?
			this.eventHandler(event);
		}
	}
	
	getEventFilter() {
		return this.filter;
	}
}
