/*
	Map<EventFilter, EventListener[]>
	Used by GameStates for keeping track of the EventListeners and their
	respective EventFilters.
*/

class ListenerMap {
	constructor() {
		this.eventListeners = new Map(); //Map<EventFilter, EventListener[]>
		for (let filter in EventFilter) { //create a new array for each EventFilter in the enum.
			this.eventListeners.set(filter, new Array());
		}
	}

	//Add the given EventListener to the array in the Map, that
	// corresponds to the listener's EventFilter.
	addEventListener(listener) {
		if (listener instanceof EventListener == false) { throw new TypeError(); }
		this.eventListeners.get(listener.getEventFilter()).push(listener);
	}

	//Return the array of EventListeners under the given filter.
	getEventListeners(filter) {
		if (!EventFilter.hasOwnProperty(""+filter)) { throw new TypeError(); }
		return this.eventListeners.get(filter);
	}
}
