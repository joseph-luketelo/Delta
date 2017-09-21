/*
	A base State class, subclasses are used by the GameEngine.
	A GameState is responsible for managing an event queue, and passing events 
	from the queue to its known EventListeners.
	Extend to create different states (ex playing, paused, start menu, game over)
*/
class GameState extends State {
	constructor() {
		super();
		this.eventQueue = new EventQueue();
		this.listeners = new ListenerMap();
	}
	
	clearEvents() {
		this.eventQueue.clear();
	}
	
	receiveEvent(e) {
		this.eventQueue.enqueue(e);
	}
	
	// add all listeners on each game object in gameObjects to this.listeners
	addListeners(gameObjects) {
		for (let obj of gameObjects) {
			let objListeners = obj.getListeners();
			for (let l of objListeners) { //TODO check for undefined?
				this.listeners.addListener(l);
			}
		}
	}
}
