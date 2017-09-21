/*
	base Event class.
	contains the Event's filter (see EventFilter.js), a specific event enum (see EventEnum.js), and optional data.
	possible events could include: collision, game event triggers, activating doors, etc.
	
	example: an event for when a door opens
	
	class DoorEvent extends Event {
		consturctor(doorObject) {
			super(EventFilter.GAME_EVENT, EventEnum.GAME_EVENT_DOOR_OPEN, doorObject);
		}
	}
	
	//Some other class creates a DoorEvent, and publishes it to the event queue.
	(see using_events.txt)
	
	// any class handling a DoorEvent can retrieve data about the door, ex:
	handleDoorEvent(doorEvent) {
		console.log(doorEvent.getData().getDoorLocation());
	}
	
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
