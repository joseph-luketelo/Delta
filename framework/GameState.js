/*
	GameStates allow the GameEngine to have different behaviours depending on the game state,
	ex. start menu, paused, playing, game over, etc.
	Extend this class to create different states.

	Responsible for managing an EventQueue, and passing Events to EventListeners.
		Since each GameState has its own EventQueue, this prevents Events from
		disappearing if the game is paused, and allows prevents input events
		from piling up while the game is paused.
*/
class GameState extends State {
	constructor() {
		super();
		this.eventQueue = new EventQueue();
		this.listenerMap = new ListenerMap();
		this.systems = new Array();
	}

	update() {}
	render() {}
	onEnter() {} //entry logic, ex. start a timer, spawn stuff
	onExit() {} //exit logic, ex stop a timer, release resources

	enqueueEvent(e) {
		this.eventQueue.enqueue(e);
	}

	dequeueEvent() {
		while (!this.eventQueue.isEmpty()) {
			const e = this.eventQueue.dequeue();
			const listeners = this.listenerMap.getEventListeners(e.getEventFilter());
			for (let l of listeners) {
				l.handleEvent(e);
			}
		}
	}

	//@param system a System
	addSystem(system) {
		if (system instanceof System == false) { throw new TypeError("invalid argument:" + system); }
		this.systems.push(system);
		// this.registerEventListeners(system.getEventListeners());
	}

	//@param l: an EventListener
	registerEventListener(l) {
		if (l instanceof EventListener == false) { throw new TypeError(); }
		this.listenerMap.addEventListener(l);
	}

	//@param listeners: an Array of EventListeners
	registerEventListeners(listeners) {
		if (listeners instanceof Array == false) { throw new TypeError(); }
		for (let l of listeners) {
			if (l instanceof EventListener == false) { throw new TypeError(); }
			this.listenerMap.addEventListener(l);
		}
	}

	clearEvents() {
		this.eventQueue.clear();
	}
}
