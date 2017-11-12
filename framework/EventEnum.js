/*
	Enums used for classifying specific events under filters.
	For example, if an EventListener receives events under the filter
	EventFilter.KEYBOARD, it can then handle the the specific event:

	// example
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
	// KEY_DOWN_W: "KEY_DOWN_W",
	// KEY_DOWN_A: "KEY_DOWN_A",
	// KEY_DOWN_S: "KEY_DOWN_S",
	// KEY_DOWN_D: "KEY_DOWN_D",
	//
	// KEY_UP_W: "KEY_UP_W",
	// KEY_UP_A: "KEY_UP_A",
	// KEY_UP_S: "KEY_UP_S",
	// KEY_UP_D: "KEY_UP_D",

	keydown_p: "keydown_p",
	keyup_p: "keyup_p",
	keydown_g: "keydown_g",
	keydown_w: "keydown_w",
	keydown_s: "keydown_s",


	GAME_EVENT_DOOR_OPEN: "GAME_EVENT_DOOR_OPEN",
	GAME_START: "GAME_START", // when game first starts.
	GAME_WON: "GAME_WON",
	GAME_PAUSE: "GAME_PAUSE",

	DESTROY_OBJECT: "DESTROY_OBJECT", //object destroyed
	// DESTROY_ASTEROID: "DESTROY_ASTEROID",
	// DESTROY_ENEMY: "DESTROY_ENEMY",

	OTHER: "OTHER"
};
