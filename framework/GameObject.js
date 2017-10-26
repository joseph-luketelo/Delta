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
	constructor(points = 0) {
		this.isActive = true; //use for flagging for removal, or other functionality,
		this.points = points; //number of points to add to score if this obj is destroyed.
		this.transform = new Transform();
		this.velocity = new Point();

		this.eventListeners = new Array();
		this.eventPublisher = new EventPublisher();
	}

	// Override for specific behaviours.
	// setup() {}
	update() {}
	render() {}

	// Publish an event to current event queue on current game state
	// @param e: the Event to publish
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

	setLocation(x, y) {this.transform.setLocation(x, y); }
	getLocation() { return this.transform.getLocation(); }
	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }

	getVelocity() { return this.velocity; }
	setVelocity(x, y) { this.velocity.set(x, y); }
	setVelocityP(point) { this.velocity.setPoint(point); }

	getPoints() {
		return this.points;
	}

	//set to inactive and create event
	//@param points an integer number of points to add to the score. Score is kept on the LevelManager.
	destroy() {
		this.isActive = false;
		const destroyEvent = new Event(EventFilter.DESTROY, EventEnum.DESTROY_OBJECT, this.points);
		this.publishEvent(destroyEvent);
	}
}
