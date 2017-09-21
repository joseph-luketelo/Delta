

//A map of EventListeners to an EventFilter; Map<EventFilter, EventListener[]>
class ListenerMap {
	constructor() {
		this.eventListeners = new Map();
		for (let filter in EventFilter) { //create a new array for each EventFilter in the enum.
			this.eventListeners.set(filter, new Array());
		}
	}
	addListener(listener) {
		//TODO check for valid arguments
		this.eventListeners.get(listener.getEventFilter()).push(listener);
	}
	getListeners(filter) {
		return this.eventListeners.get(filter);
	}
}
