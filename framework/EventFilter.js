/*
	An enum of Event filters. Events are organized by filter. EventListeners can
	listen for specific events by specifying a filter to use.
	
	Use:
	the ListenerMap class is a Map of an EventListener array to a filter:
	Map<EventFilter, EventListener[]> //java
	classes responsible for passing events to EventListeners (such as GameState)
	may use a ListenerMap in order to send Events to the relevant listeners.
*/

let EventFilter = {
	KEYBOARD: "KEYBOARD",
	COLLISION: "COLLISION",
	GAME_EVENT: "GAME_EVENT",
	OTHER: "OTHER",
}
