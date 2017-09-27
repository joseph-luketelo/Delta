/*
	Receives Events from some source and adds them to the queue.
	Dequeued events are passed to a given map of EventListeners; each listener handles
	the event on some way.
	class that contain an EventQueue: GameState
*/
class EventQueue {
	constructor() {
		this.eventQueue = new Array(); //the queue of Events.
	}

	// Add an event to the event queue.
	// @param event an Event to add to this queue
	enqueue(event) {
		if (event instanceof Event == false) { throw new TypeError(); }
		this.eventQueue.push(event); //add event to the end of the array
	}

	//@return return the next event in the queue, or undefined if queue is empty.
	dequeue() {
		//unchecked
		return this.eventQueue.shift(); //remove event from the front of the array
	}

	isEmpty() {
		return this.eventQueue.length == 0;
	}

	//Remove events from the queue.
	clear() {
		this.eventQueue = new Array();
	}
}
