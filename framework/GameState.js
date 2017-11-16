/*
	GameStates allow the GameEngine to have different behaviours depending on the game state,
	ex. start menu, paused, playing, game over, etc.
	Extend this class to create different states.
	Calls setup, upate, render, onEnter, onExit for all its Systems.

	Responsible for managing an EventQueue, and passing Events to EventListeners.
		Since each GameState has its own EventQueue, this prevents Events from
		disappearing if the game is paused, and prevents input events from
		piling up while the game is paused.
*/
class GameState extends State {
	constructor() {
		super();
		this.eventQueue = new EventQueue();
		this.listenerMap = new ListenerMap(); //Map <EventFilter, Array<EventListener>>
		this.systems = new Array();
	}

	// setup() {
	// 	for (let sys of this.systems) {
	// 		sys.setup();
	// 	}
	// }

	update() {
		this.dequeueEvent();
		for (let sys of this.systems) {
			sys.update();
		}
	}

	//call onEnter on all systems
	onEnter() { //entry logic, ex. start a timer, spawn stuff
		for (let sys of this.systems) {
			sys.onEnter();
		}
	}

	//call onExit on all systems
	onExit() { //exit logic, ex stop a timer, release resources
		for (let sys of this.systems) {
			sys.onExit();
		}
	}

	//add an event to the queue
	enqueueEvent(e) {
		this.eventQueue.enqueue(e);
	}

	//dequeue all events from the event queue and pass them to EventListeners in the listener map
	dequeueEvent() {
		while (!this.eventQueue.isEmpty()) {
			const e = this.eventQueue.dequeue();
			const listeners = this.listenerMap.getEventListeners(e.getEventFilter());
			for (let l of listeners) {
				l.handleEvent(e);
			}
		}
	}

	//Add a system to this game state, and register the system's event listeners.
	//@param system a System
	addSystem(system) {
		if (system instanceof System == false) { throw new TypeError("invalid argument:" + system); }
		this.systems.push(system);
		this.registerEventListeners(system.getEventListeners());
	}

	// removeSystem(system) {
	// }

	//add an event listener to the map
	//@param l: an EventListener
	registerEventListener(l) {
		if (l instanceof EventListener == false) { throw new TypeError(); }
		this.listenerMap.addEventListener(l);
	}

	//add multiple event listeners to the map
	//@param listeners: an Array of EventListeners
	registerEventListeners(listeners) {
		if (listeners instanceof Array == false) { throw new TypeError(); }
		for (let l of listeners) {
			this.registerEventListener(l);
		}
	}

	//clear all events from the queue
	clearEvents() {
		this.eventQueue.clear();
	}
}
