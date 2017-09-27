/*
	Events allow classes or Systems to communicate indirectly. One class publishes a specific event,
	another class interested in such events can handle the event.

	Events should be published using an EventPublisher.
	EventListeners must be registed to a GameState to receive Events. this is done in the GameEngine constructor.

	EventFilter: used by ListenerMap and GameState for filtering Events.
	EventEnum: a specific enum value used for distinguishing events under a filter
	ex. an EventListener interested in key events would use the filter
	EventFilter.KEYBOARD, in order to receive events like KEY_DOWN_W when the 'w' key is pressed.
	Other possible events could include: collisions, score reached triggers -> spawning bosses

*/

class Event {
	//data: data about the event, usually the event's source.
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
