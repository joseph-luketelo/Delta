/*
	Enums used for classifying specific events under filters.
	For example, if an EventListener receives events under the filter
	EventFilter.KEYBOARD, it can then handle the the specific event:

	// example (outdated)
	handleKeyEvent(e) {
		switch(e.getEventEnum()) {
			case EventEnum.KEY_UP_D:
				console.log("d key was released.");
				break;
			case EventEnum.KEY_DOWN_D:
				console.log("d key is was pressed.");
				break;
		}
	}
*/

const EventEnum = {
	keydown_p: "keydown_p",
	keyup_p: "keyup_p",
	keydown_g: "keydown_g",
	keydown_w: "keydown_w",
	keydown_s: "keydown_s",

	GAME_EVENT_DOOR_OPEN: "GAME_EVENT_DOOR_OPEN",
	GAME_START: "GAME_START",
	GAME_WON: "GAME_WON",
	GAME_PAUSE: "GAME_PAUSE",

	DESTROY_OBJECT: "DESTROY_OBJECT", //object destroyed
	// DESTROY_ASTEROID: "DESTROY_ASTEROID",
	// DESTROY_ENEMY: "DESTROY_ENEMY",

	OTHER: "OTHER"
};
