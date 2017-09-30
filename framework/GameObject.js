/*
	Base class for game objects like Player, Enemy, Asteroid, etc.

	Contains an EventPublisher, for if the Subclass wants to publish Events.
	// ex. Player uses flashbang and creates a FlashBang event
	flashbang() {
		let bang = new Event(EventFilter.COMBAT, EventEnum.FLASH_BANG, null);
		this.publishEvent(bang);
	}
*/

class GameObject {
	constructor() {
		this.isActive = true;
		this.eventListeners = new Array();
		this.eventPublisher = new EventPublisher();
	}

	// Override for specific behaviours.
	update() {}
	render() {}

	// Publish an event to the current EventQueue.
	// @param e an Event to publish
	publishEvent(e) {
		if (e instanceof Event == false) { throw new TypeError(); }
		this.eventPublisher.publishEvent(e);
	}

	getIsActive() {
		return this.isActive;
	}

	//deactivate, possibly flag for removal
	deactivate() {
		this.isActive = false;
	}

	addEventListener(eventListener) {
		if (eventListener instanceof EventListener == false) { throw new TypeError(); }
		this.eventListeners.push(eventListener);
	}

	// Return this object's array of EventListeners.
	//use this for adding this object's listeners to a System's, or registering
	//this object's listners with a GameState.
	getEventListeners() {
		return this.eventListeners;
	}
}
