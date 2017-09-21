//A base game object class for things like Players and Enemies.
class GameObject {
	constructor() {
		this.eventListeners = new Array();
		this.eventPublisher = new EventPublisher();
	}
	update() {}
	render() {}
	getListeners() {
		return this.eventListeners;
	}
	publishEvent(e) {
		this.eventPublisher.publishEvent(e);
	}
}


