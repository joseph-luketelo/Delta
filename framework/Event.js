



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