/*
	Class used for handling events from a specific filter.
	
*/
class EventListener {
	//eventHandler: a callback method that is invoked when this listener's handleEvent(e) method is called.
	//filter: the EventFilter to listen to.
	constructor(eventHandler, filter) {
		if (eventHandler == undefined || filter == undefined) {
			throw new TypeError("argument error: " + " EventListener(" + eventHandler + ", " + filter + ")");
		}
		this.eventHandler = eventHandler;
		this.filter = filter;
	}
	handleEvent(e) {
		if (e instanceof Event) { //TODO check if event is of the correct filter?
			this.eventHandler(e);
		}
	}
	getEventFilter() {
		return this.filter;
	}
}