/*

	Extend this class to implement your own system.

	use the constructor to create dependencies.
	any object you need to know about, ex player, must be passed to the constructor.
	additionally, such objects must be defined before this System can be defined.

	//example
	class PlayerSystem extends System {
		constructor(player) {
			super();
			this.player = player;
		}

		//update the player's location
		update() {
			this.player.update();
		}
		render() {
			this.player.render();
		}
	}

}
 */

class System {
	constructor() {
		this.publisher = new EventPublisher();
		this.eventListeners = new Array();
	}

	update() {}
	// onEnter() {}
	// onExit() {}
	render() {}

	addEventListener(l) {
		if (l instanceof EventListener == false) { throw new TypeError(); }
		this.eventListeners.push(l);
	}
	addEventListeners(listeners) {
		if (listeners instanceof Array == false) { throw new TypeError(); }
		for (let l of listeners) {
			if (l instanceof EventListener == false) { throw new TypeError(); }
			this.eventListeners.push(l);
		}
	}

	getEventListeners() {
		return this.eventListeners;
	}

	// Publish an event to the current EventQueue.
	// @param e an Event to publish
	publishEvent(e) {
		if (e instanceof Event == false) { throw new TypeError(); }
		this.eventPublisher.publishEvent(e);
	}

}
