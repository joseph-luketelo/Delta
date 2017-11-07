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
	constructor(points = 0, life = 100) {
		this.isActive = true; //use for flagging for removal, or other functionality,
		this.points = points; //number of points to add to score if this obj is destroyed.
		this.life = life;

		this.transform = new Transform();
		this.velocity = new Point();

		this.eventListeners = new Array();
		this.eventPublisher = new EventPublisher();
	}

	//Methods used for checking if object is offscreen
	static getBufferValue() { return 100; }
	static getBufferN() { return -GameObject.getBufferValue(); }
	static getBufferE() { return WIDTH + GameObject.getBufferValue(); }
	static getBufferS() { return HEIGHT + GameObject.getBufferValue(); }
	static getBufferW() { return -GameObject.getBufferValue(); }

	// Override for specific behaviours.
	update() {}
	render() {}

	// Publish an event to current event queue on current game state
	// @param e: the Event to publish
	publishEvent(e) {
		if (e instanceof Event == false) { throw new TypeError(); }
		this.eventPublisher.publishEvent(e);
	}

	//return true if thsi object is off-screen.
	//includes offscreenBuffer, incase objects also need to spawn offscreen.
	isOffscreen() {
		return 	(this.getX() < GameObject.getBufferW()) ||
				(this.getX() > GameObject.getBufferE()) ||
				(this.getY() < GameObject.getBufferN()) ||
				(this.getY() > GameObject.getBufferS());
	}

	getIsActive() { return this.isActive; }
	deactivate() { this.isActive = false; } //deactivate, possibly flag for removal

	addEventListener(eventListener) {
		if (eventListener instanceof EventListener == false) { throw new TypeError(); }
		this.eventListeners.push(eventListener);
	}

	// Return this object's array of EventListeners.
	getEventListeners() { return this.eventListeners; }

	setLocation(x, y) {this.transform.setLocation(x, y); }
	setLocationP(point) { this.transform.setLocation(point.getX(), point.getY()); }
	getLocation() { return this.transform.getLocation(); }
	getX() { return this.transform.getX(); }
	getY() { return this.transform.getY(); }

	getVelocity() { return this.velocity; }
	setVelocity(x, y) { this.velocity.set(x, y); }
	setVelocityP(point) { this.velocity.setPoint(point); }

	getPoints() { return this.points; } //return how many points this object is worth
	getLife() { return this.life; }

	//damage this object. will automatically destroy itself if life reaches 0.
	//@param dam: an int amount of damage to inflict.
	damage(dam) {
		this.life -= dam;
		if (this.life <= 0) {
			this.destroy();
		}
	}

	//set to inactive and create event
	//@param points an integer number of points to add to the score. Score is kept on the LevelManager.
	destroy() {
		this.isActive = false;
		const destroyEvent = new Event(EventFilter.DESTROY, EventEnum.DESTROY_OBJECT, this.points);
		this.publishEvent(destroyEvent);
	}
}
