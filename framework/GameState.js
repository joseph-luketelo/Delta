/*
	A base State class, subclasses are used by the GameEngine. GameStates allow
	the GameEngine to have different behaviours depending on the game state,
	ex. start menu, paused, playing, game over, etc.
	A GameState is responsible for managing an event queue, and passing events 
	from the queue to its known EventListeners.
	Since each GameState has its own EventQueue, this prevents Events from 
	disappearing if the game is paused, and allows us to ignore input events
	if the game is paused.
	Extend this class to create different states (ex playing, paused, start menu, game over)
*/
class GameState extends State {
	constructor() {
		super();
		this.eventQueue = new EventQueue();
		this.eventListeners = new ListenerMap();
	}
	
	receiveEvent(e) {
		this.eventQueue.enqueue(e);
	}
	
	clearEvents() {
		this.eventQueue.clear();
	}
	
	addListener(l) {
		this.eventListeners.addListener(l);
	}
	
	// Adds all listeners on each game object in gameObjects to this.listeners
	// @param gameObjects: an array of GameObjects
	addListenersFromObjects(gameObjects) {
		for (let obj of gameObjects) {
			let objListeners = obj.getListeners();
			for (let l of objListeners) { //check for undefined?
				this.eventListeners.addListener(l);
			}
		}
	}
}
