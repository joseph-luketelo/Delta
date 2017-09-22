/*
	Receives Events from some source and adds them to the queue.
	Dequeued events are passed to a given map of EventListeners; each listener handles
	the event on some way.
	class that contain an EventQueue: GameState
*/
class EventQueue {
	constructor() {
		this.eventQueue = new Array(); //array of Events.
	}
	
	//add an event to the event queue.
	enqueue(event) {
		if (event instanceof Event) {
			this.eventQueue.push(event); //add event to the end of the array
		} else {
			throw new TypeError(event + " is not an instance of Event.");
		}
	}
	
	//pass the next event in the queue to the EventListeners in the given ListenerMap.
	dequeue(listenerMap) {
		if (this.eventQueue.length > 0) {
			if (listenerMap instanceof ListenerMap) {
				let e = this.eventQueue.shift(); //remove event from the front of the array
				let listeners = listenerMap.getListeners(e.getEventFilter());
				listeners.forEach(function(listener) {
					listener.handleEvent(e);
				});
			} else {
				throw new TypeError("argument error: " + listenerMap);
			}
		}
	}
	
	//Remove events from the queue.
	clear() {
		this.eventQueue = new Array();
	}
}
