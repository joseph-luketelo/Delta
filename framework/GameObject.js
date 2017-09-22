/*
	A base game object class for things like Players and Enemies.
	Contains an array of EventListeners. Subclasses define their
	own EventListeners, and should add them to the array.
	Contains an EventPublisher, should the Subclass want to publish
	an event.
	
	// ex. Player creates a FlashBang event
	flashbang() {
		let bang = new Event(EventFilter.COMBAT, EVENT_ENUM.FLASH_BANG, null);
		this.publishEvent(bang);
	}
	
*/

class GameObject {
	constructor() {
		this.eventListeners = new Array();
		this.eventPublisher = new EventPublisher();
	}
	
	//Override for specific behaviours.
	update() {}
	render() {}
	
	//Return this object's array of EventListeners. Used by GameStates,
	// for adding GameObject's listeners to the GameState's ListenerMap.
	getListeners() {
		return this.eventListeners;
	}
	
	//Publish an event to the current EventQueue in the GameEngine.
	publishEvent(e) {
		this.eventPublisher.publishEvent(e);
	}
}


