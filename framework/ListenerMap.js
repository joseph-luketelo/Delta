
/*
	Contains a map of EventListeners to each filter in EventFilter; 
	Map<EventFilter, EventListener[]>
	Used by GameStates for keeping track of the EventListeners under their 
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
	addListener(listener) {
		//TODO check for valid listener
		this.eventListeners.get(listener.getEventFilter()).push(listener);
	}
	
	//Return the array of EventListeners under the given filter.
	getListeners(filter) {
		return this.eventListeners.get(filter);
	}
	
}
